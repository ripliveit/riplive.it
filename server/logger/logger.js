const winston = require('winston');
const papertrail = require('winston-papertrail').Papertrail;
const DailyRotateFile = require('winston-daily-rotate-file');

const logger = new winston.Logger({
    transports: [
        new DailyRotateFile({
            name: 'logfile',
            datePattern: '.yyyy-MM-dd',
            filename: __dirname + '/../../logs/logfile.log',
            maxFiles: 7,
            zippedArchive: true
        }),
        new winston.transports.Papertrail({
            host: 'logs3.papertrailapp.com',
            port: 53348
        })
    ]
});

module.exports = logger;
