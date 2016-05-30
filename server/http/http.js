'use strict';

/**
 * A generic HTTP Service,
 * used to make GET and POST request to a remote server.
 * Use request library to perform the request.
 *
 * @author gabrieledarrigo - darrigo.g@gmail.com
 */

let request = require('request');


/**
 * Perform a GET request.
 *
 * @param  {string}   uri The remote server's uri.
 * @param  {Function} cb  A callback fired when all operations are done.
 * @return {undefined}
 */
const get = (uri, cb) => request.get(uri, cb);


/**
 * Perform a POST request.
 *
 * @param  {string}   uri  The remote server's uri.
 * @param  {object}   data The data to send.
 * @param  {Function} cb   A callback fired when all operations are done.
 * @return {undefined}
 */
const post = (uri, data, cb) => {
    const payLoad = {
        form: data || {}
    };

    return request.post(uri, payLoad, cb);
};

module.exports = {
    get: get,
    post: post
};
