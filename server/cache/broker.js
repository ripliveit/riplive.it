'use strict';

/**
 * A broker responsible to save and
 * retrieve data from memcached.
 * @authot gabrieledarrigo - darrigo.g@gmail.com
 */

let client = require('./memcached-client.js');

const DEFAULT_LIFETIME = 60;


/**
 * Return the default lifetime.
 *
 * @return {Number}
 */
const getDefaultLifeTime = () => DEFAULT_LIFETIME;


/**
 * Set a value on memcached.
 * Need a key, the value to set, the cache lifetime and a callback fired
 * when the operation is done.
 *
 * @param {string}   key
 * @param {string}   value
 * @param {Function} cb
 */
const set = (key, value, time, cb) => {
    client.set(key, value, time || DEFAULT_LIFETIME, err => {
        if (err) {
            return cb(err);
        }

        cb(null, value);
    });
};

/**
 * Try to retrieve the data, memorized with a
 * a specific key from memcache.
 * If no data are found, then an http request is performed
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
        if (err) {
            return cb(err, null);
        }

        cb(null, data);
    });
};

module.exports = {
    getDefaultLifeTime: getDefaultLifeTime,
    set: set,
    get: get
};
