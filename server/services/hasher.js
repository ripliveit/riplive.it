var crypto = require('crypto');

/**
 * Function that, given a string, return an MD5 hash.
 */
function Hasher() {

	/**
	 * Return an md5 hash.
	 * 
	 * @param  {String} string
	 * @return {String}
	 */
    this.getHash = function (string) {
        var hash = crypto.createHash('md5').update(string).digest('hex');

        return hash;
    };
};

module.exports = new Hasher();