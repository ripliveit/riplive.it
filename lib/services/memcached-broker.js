var request = require('request');
var memcached = require('./memcached-client.js');
var HttpService = require('./http-service.js');

/**
 * A broker responsible to save and
 * retrieve data from memcached.
 */
var MemcachedBroker = function() {
    var self = this;
    var lifetime;

    /**
     * Make an http request to retrieve the data from a remote server.
     * When data are retrieved than perform a write on memcached's memory.
     *
     * @param  {string}   uri The remote uri server.
     * @param  {string}   key
     * @param  {Function} cb
     * @return {undefined}
     */
    var doRequest = function(uri, key, cb) {
        HttpService.get(uri, function(err, response, body) {
            if (err) return cb(err, null);

            // Persists 
            // on memcached.
            set(key, body, cb);
        });
    };

    /**
     * Set a value on memcached.
     * Need a key, the value to set, and a callback fired
     * when the operation is done.
     *
     * @param {string}   key
     * @param {string}   value
     * @param {Function} cb
     */
    var set = function(key, value, cb) {
        memcached.set(key, value, lifetime, function(err) {
            if (err) {
                return cb(err);
            }

            //console.log('saved in cache with success');
            cb(null, value);
        });
    };

    /**
     * Set a lifetime for a particulare value.
     *
     * @param {string} time
     */
    this.setTime = function(time) {
        if (typeof time === 'undefined') {
            lifetime = 10;
        }

        lifetime = time;

        return this;
    };

    /**
     * Try to retrieve the data, memorized with a
     * a specific key from memcache.
     * If no data are found, then an http request is perfomed
     * to grab the data, save them into memcache and return to
     * the client.
     *
     * @param  {string}   key
     * @param  {string}   uri
     * @param  {Function} cb
     * @return {undefined}
     */
    this.get = function(key, uri, cb) {
        memcached.get(key, function(err, data) {
            if (err) return cb(err, null);

            if (!data) {
                doRequest(uri, key, cb);
            } else {
                //console.log('returning from cache');

                cb(null, data);
            }
        });
    };
};

module.exports = new MemcachedBroker();
