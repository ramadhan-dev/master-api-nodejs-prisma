const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const AuthRoute = require('../modules/auth/routes/authRoute')

const UserRouter = require('../modules/employee/user/routes/userRoute')
const TenantRoute = require('../modules/master/tenant/routes/tenantRoute')
const CompanyRoute = require('../modules/master/company/routes/companyRoute')
const DivisionRoute = require('../modules/master/division/routes/DivisionRoute')
const UserLocationRoute = require('../modules/employee/user_location/routes/UserLocationRoute')
const AttendanceRoute = require('../modules/employee/attendance/routes/AttendanceRoute')
const ShiftTypeRoute = require('../modules/employee/shift_type/routes/ShiftTypeRoute')
const UserShiftRoute = require('../modules/employee/user_shift/routes/UserShiftRoute')

const RoleRoute = require('../modules/master/role/routes/RoleRoute')

// Middleware 
const {verifyToken} = require('./../middleware/AuthMiddleware')

app.use('/api/auth',  AuthRoute);


app.use('/api/user', verifyToken, UserRouter);
app.use('/api/tenant', verifyToken,  TenantRoute);
app.use('/api/company', verifyToken, CompanyRoute);
app.use('/api/division', verifyToken, DivisionRoute);
app.use('/api/user-location', verifyToken, UserLocationRoute);
app.use('/api/attendance', verifyToken, AttendanceRoute);
app.use('/api/shift-type', verifyToken, ShiftTypeRoute);
app.use('/api/user-shift', verifyToken, UserShiftRoute);


// AUTH
app.use('/api/role', verifyToken, RoleRoute);
app.use('/api/user-role', verifyToken, UserShiftRoute);



// Endpoint to get log files
app.get('/logs', (req, res) => {
    const logDir = path.join('logs/morgan');
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
