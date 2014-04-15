var bunyan = require('bunyan');

/**
* Define a logger.
*/
var logger = bunyan.createLogger({
    name: 'riplive',
    streams: [{
        type: 'rotating-file',
        path: __dirname + '/../../logs/logfile.log',
        period: '1d',
        count: 7
    }, {
        stream: process.stderr,
        level: 'error'
    }]
});

module.exports = logger;