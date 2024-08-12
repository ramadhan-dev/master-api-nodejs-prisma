const express = require('express');
const app = express();

const UserRouter = require('../modules/user/routes/userRoute')


app.use('/api/user', UserRouter);


module.exports = app;
