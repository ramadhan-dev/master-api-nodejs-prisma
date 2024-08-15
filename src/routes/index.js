const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const UserRouter = require('../modules/user/routes/userRoute')
const TenantRoute = require('../modules/master/tenant/routes/tenantRoute')

app.use('/api/user', UserRouter);
app.use('/api/tenant', TenantRoute);



// Endpoint to get log files
app.get('/logs', (req, res) => {
    const logDir = path.join('morgan');
    fs.readdir(logDir, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to read logs');
        }

        const logFiles = files.filter(file => path.extname(file) === '.log');
        res.json(logFiles);
    });
});


app.get('/logs/:fileName', (req, res) => {
    const { search, limit } = req.query; // Ambil parameter pencarian dari query string
    const { fileName } = req.params;
    const logDir = path.join('logs/morgan');
    const filePath = path.join(logDir, fileName);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Unable to read log file');
        }

        let logEntries = data.split('\n').filter(line => line).map(line => JSON.parse(line));

        // Jika ada kata kunci pencarian, filter entri log
        if (search) {
            const searchTerm = search.toLowerCase();
            logEntries = logEntries.filter(entry => {
                // Anda dapat menyesuaikan filter ini berdasarkan kebutuhan pencarian Anda
                return Object.values(entry).some(value =>
                    value.toString().toLowerCase().includes(searchTerm)
                );
            });
        }


        // Urutkan entri log berdasarkan waktu (log terbaru terlebih dahulu)
        logEntries.sort((a, b) => new Date(b.time) - new Date(a.time));

        // Jika ada limit, ambil hanya sejumlah limit yang ditentukan
        if (limit) {
            logEntries = logEntries.slice(0, parseInt(limit));
        }

        res.json(logEntries);
    });
});



module.exports = app;
