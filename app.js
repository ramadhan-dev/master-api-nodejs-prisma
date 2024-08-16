const express = require("express");
const bodyParser = require("body-parser");
const mongoSanitize = require("express-mongo-sanitize")
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");

//const {morganMiddleware} = require("./src/utility/morgan")
const cors = require("./src/utility/cors");
const helmetConfig = require("./src/utility/helmet");
const routes = require('./src/routes');
const app = express();


// app.use(morganMiddleware);
app.use(cors.create())
app.use(helmetConfig)
app.use(mongoSanitize())
app.use(hpp())

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

//Request Rate Limit Implementation
const Limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 })
app.use(Limiter);


// app.use((req, res, next) => {
//     const oldWrite = res.write;
//     const oldEnd = res.end;
//     const chunks = [];

//     res.write = function (chunk) {
//         chunks.push(chunk);
//         return oldWrite.apply(res, arguments);
//     };

//     res.end = function (chunk) {
//         if (chunk) chunks.push(chunk);
//         const body = Buffer.concat(chunks).toString('utf8');
//         res.locals.responseBody = body; // Save response body to res.locals
//         oldEnd.apply(res, arguments);
//     };

//     next();
// });


app.use(routes);


app.use('*', (req, res) => {
    res.status(404).json({ message: "Fail", data: "Route Not Found" });
});

module.exports = app;
