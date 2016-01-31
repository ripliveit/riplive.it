'use strict';

/**
 * A broker responsible to save and
 * retrieve data from memcached.
 * @authot gabrieledarrigo - darrigo.g@gmail.com
 */

let client = require('./memcached-client.js');
let http = require('./http.js');

/**
 * Default lifetime
 */
let lifetime = 60;

/**
 * Make an http request to retrieve the data from a remote server.
 * When data are retrieved than perform a write on memcached's memory.
 *
 * @param  {string}   uri The remote uri server.
 * @param  {string}   key
 * @param  {Function} cb
 * @return {undefined}
 */
const doRequest = function(uri, key, cb) {
    http.get(uri, (err, response, body) => {
        if (err) return cb(err, null);

        // Persists
        // on memcached.
        set(key, body, cb);
    });
};

/**
 * Return the default lifetime.
 *
 * @return {Number}
 */
const getTime = () => lifetime;


/**
 * Set the lifetime.
 *
 * @param {string} time
 */
const setTime = time => lifetime = time;

/**
 * Set a value on memcached.
 * Need a key, the value to set, and a callback fired
 * when the operation is done.
 *
 * @param {string}   key
 * @param {string}   value
 * @param {Function} cb
 */
const set = (key, value, cb) => {
    client.set(key, value, lifetime, err => {
        if (err) return cb(err);
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
const get = (key, uri, cb) => {
    client.get(key, (err, data) => {
        if (err) return cb(err, null);

        if (!data) {
            doRequest(uri, key, cb);
        } else {
            cb(null, data);
        }
    });
};

module.exports = {
    getTime: getTime,
    setTime: setTime,
    doRequest: doRequest,
    set: set,
    get: get
};
