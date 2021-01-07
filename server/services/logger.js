var winston = require('winston');
var DailyRotateFile = require('winston-daily-rotate-file');

var logger = new winston.createLogger({
    transports: [
        new DailyRotateFile({
            name: 'logfile',
            datePattern: '.yyyy-MM-dd',
            filename: __dirname + '/../../logs/logfile.log',
            maxFiles: 7,
            zippedArchive: true
        })
    ]
});

module.exports = logger;
