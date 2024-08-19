const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');

const logDir = 'logs/logger';

// Create logs directory if not exists
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

// Create logger instance
const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: `${logDir}/%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            maxFiles: '10d', // Keep only the last 10 log files
        })
    ]
});

// Function to zip old logs
function zipOldLogs() {
    fs.readdir(logDir, (err, files) => {
        if (err) throw err;

        // Filter out log files older than the most recent 10 files
        const logFiles = files.filter(file => path.extname(file) === '.log').sort();
        if (logFiles.length > 10) {
            const filesToZip = logFiles.slice(0, logFiles.length - 10);

            const output = fs.createWriteStream(`${logDir}/archived_logs_${Date.now()}.zip`);
            const archive = archiver('zip', { zlib: { level: 9 } });

            output.on('close', () => {
                console.log(`Zipped ${archive.pointer()} total bytes`);
                // Delete old log files after zipping
                filesToZip.forEach(file => fs.unlinkSync(path.join(logDir, file)));
            });

            archive.pipe(output);

            filesToZip.forEach(file => {
                archive.file(path.join(logDir, file), { name: file });
            });

            archive.finalize();
        }
    });
}

// Call zipOldLogs whenever a new log is created
setInterval(zipOldLogs, 24 * 60 * 60 * 1000);
module.exports = logger;
