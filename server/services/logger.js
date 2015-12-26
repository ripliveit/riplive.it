var winston = require('winston');
var papertrail = require('winston-papertrail').Papertrail;
var DailyRotateFile = require('winston-daily-rotate-file');

var logger = new winston.Logger({
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
