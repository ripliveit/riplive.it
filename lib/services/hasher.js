var crypto = require('crypto');

/**
 * Function that, given a string, return an MD5 hash.
 */
var Hasher = function () {
    this.getHash = function (string) {
        var hash = crypto.createHash('md5').update(string).digest('hex');

        return hash;
    };
};

module.exports = new Hasher();