var config = require('config');
var hasher = require(__dirname + '/../services/hasher.js');
var broker = require(__dirname + '/../services/memcached-broker.js');

/**
 * A Dao from which 
 * all other Dao inherits.
 */
function BaseDao() {

    /**
     * Wordpress URI.
     * Used to retrieve data against
     * remote endpoint.
     * 
     * @type {String}
     */
    this.wpUri = config.wp_uri;

    /**
     * Wordpress Admin Uri.
     * Used to retrieve data against
     * remote endpoint.
     * 
     * @type {String}
     */
    this.adminUri = config.admin_uri;

    /**
     * An object used to
     * get an md5 hash (used as a key for memcached)
     * 
     * @type {Object}
     */
    this.hasher = hasher;

    /**
     * An object used to retrieve
     * data from remote endpoints and cache data
     * into memcached.
     * 
     * @type {Object}
     */
    this.broker = broker;
}

/**
 * Return the wordpress uri.
 * 
 * @return {String}
 */
BaseDao.prototype.getWpUri = function() {
    return this.wpUri;
};

/**
 * Return the admin uri.
 * 
 * @return {String}
 */
BaseDao.prototype.getAdminUri = function() {
    return this.adminUri;
};

module.exports = BaseDao;
