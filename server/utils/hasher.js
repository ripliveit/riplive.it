'use strict';

let crypto = require('crypto');

/**
 * Function that, given a string, return an MD5 hash.
 *
 * @author gabrieledarrigo - darrigo.g@gmail.com
 * @param {string}
 * @return {string}
 */
const getHash = string => {
    const hash = crypto.createHash('md5');
    hash.update(string);
    hash.digest('hex');

    return hash;
};

module.exports = {getHash};