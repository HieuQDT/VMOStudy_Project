const winston = require('winston');
///////////////////////////////////// CONTROLLER LOGGER
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: './src/error/error.log',
            level: 'error',
        },
        ),
        new winston.transports.File({
            filename: './src/error/info.log',
            level: 'info',
        },
        ),
    ],

    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
    ),
});

///////////////////////////////////// EXPORT MODULES
module.exports = logger;

///
///
///
///
// const expressWinston = require('express-winston');
// const express = require('express');
// const app = express();
// const router = express.Router();

// app.use(expressWinston.logger({
//     transports: [
//         new winston.transports.File({
//             filename: './src/error/info.log',
//         }),
//     ],
//     level: 'info',
//     format: winston.format.combine(
//         winston.format.timestamp(),
//         winston.format.colorize(),
//         winston.format.json(),
//     ),
// }));

// app.use(router);

// app.use(expressWinston.errorLogger({
//     transports: [
//         new winston.transports.File({
//             filename: './src/error/error.log',
//         }),
//     ],
//     format: winston.format.combine(
//         winston.format.colorize(),
//         winston.format.json(),
//     ),
// }));