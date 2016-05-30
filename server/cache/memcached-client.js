let config = require('config');
let Memcached = require('memcached');
let logger = require(__dirname + '/../logger/logger.js');

// Memcache configuration.
const memcached = new Memcached(config.memcache_uri, {
    poolSize: 20,
    retries: 5,
    failures: 5,
    keyCompression: false
});

// Define all event listener for memcache connection.
memcached.on('failure', details => {
    const message = 'Server ' + details.server + 'went down due to: ' + details.messages.join('');
    console.error(message);
    logger.error(message);
});

memcached.on('reconnecting', details => {
    const message = 'Total downtime caused by server ' + details.server + ' :' + details.totalDownTime + 'ms';
    console.error(message);
    logger.info(message);
});

memcached.on('issue', err => {
    console.error(err);
    logger.error(err);
});

memcached.on('reconnected', err => {
    console.error(err);
    logger.error(err);
});

memcached.on('remove', err => {
    console.error(err);
    logger.error(err);
});

module.exports = memcached;
