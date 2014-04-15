/**
 * All module dependecies.
 */
var app = require('../../app.js');
var logger = require('./logger.js');
var Memcached = require('memcached');

// Memcache configuration.
var memcached = new Memcached(app.get('memcache_uri'), {
    poolSize: 20,
    retries: 5,
    failures: 5,
    keyCompression: false
});

// Define all event listener for memcache connection.
memcached.on('failure', function(details) {
    var message = 'Server ' + details.server + 'went down due to: ' + details.messages.join('');
    console.error(message);
    logger.error(message);
});

memcached.on('reconnecting', function(details) {
    var message = 'Total downtime caused by server ' + details.server + ' :' + details.totalDownTime + 'ms';
    console.error(message);
    logger.info(message);
});

memcached.on('issue', function(err) {
    console.error(err);
    logger.error(err);
});

memcached.on('reconnected', function(err) {
    console.error(err);
    logger.error(err);
});

memcached.on('remove', function(err) {
    console.error(err);
    logger.error(err);
});

module.exports = memcached;
