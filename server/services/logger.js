var winston = require('winston');
require('winston-daily-rotate-file');

var logger = new winston.createLogger({
    level: 'info',
    format:  winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.json(),
        winston.format.timestamp(),
      ),
    transports: [
        new (winston.transports.DailyRotateFile)({
            filename: __dirname + '/../../logs/logfile.log',
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
          })
    ]
});

module.exports = logger;
