/**
 * A broker responsible to save and
 * retrieve data from memcached.
 */
function MemcachedBroker(memcached, HttpService) {
    var self = this;

    /**
     * And object uset to persist data
     * 
     * @type {Object}
     */
    this.memcached = memcached;

    /**
     * Used to make http request to remote 
     * server.
     * 
     * @type {Object}
     */
    this.HttpService = HttpService;

    /**
     * Default lifetime
     */
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
        self.HttpService.get(uri, function(err, response, body) {
            if (err) return cb(err, null);
            
            // Persists 
            // on memcached.
            self.set(key, body, cb);
        });
    };

    /**
     * Return the default setted lifetime.
     * 
     * @return {Number}
     */
    this.getTime = function() {
        return lifetime;
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
     * Set a value on memcached.
     * Need a key, the value to set, and a callback fired
     * when the operation is done.
     *
     * @param {string}   key
     * @param {string}   value
     * @param {Function} cb
     */
    this.set = function(key, value, cb) {
        self.memcached.set(key, value, lifetime, function(err) {
            if (err) return cb(err);

            //console.log('saved in cache with success');
            cb(null, value);
        });
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
        self.memcached.get(key, function(err, data) {
            if (err) return cb(err, null);

            if (!data) {
                doRequest(uri, key, cb);
            } else {
                cb(null, data);
            }
        });
    };

   /**
     * Fetch without persisting in memcached
     *
     * @param  {string}   uri
     * @param  {Function} cb
     */
    this.fetch = function(uri, cb) {
        self.HttpService.get(uri, function(err, response, body) {
            if (err) return cb(err, null);
            
            cb(null, body);
        });
    }
};

module.exports = MemcachedBroker;
