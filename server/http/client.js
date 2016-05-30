'use strict';

let http = require('../http/http.js');
let broker = require('../cache/broker.js');

/**
 * Do a HTTP request to retrieve the data from a remote server.
 * When data are retrieved than perform a write on cache server.
 *
 * @param uri
 * @param key
 * @param time
 * @param cb
 */
const doRequest = function(uri, key, time, cb) {
    http.get(uri, (err, response, body) => {
        if (err) {
            return cb(err, null);
        }

        // Persists on cache
        broker.set(key, body, time, cb);
    });
};

const execute = (command, cb) => {
    const { uri, key, time } = command;

    broker.get(key, (err, data) => {
        if (err) {
            return cb(err, null);
        }

        if (!data) {
            doRequest(uri, key, time, cb);
        } else {
            cb(null, data);
        }
    });
};

module.exports = {
    execute: execute
};
