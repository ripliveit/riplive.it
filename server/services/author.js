var util = require('util')
var BaseDao = require(__dirname + '/base-dao.js');

/**
 * Author Data Access Object.
 * Implement method to retrieve and manipulate Author Object.
 * Use the Broker to retrieve and save data to / from memcached.
 */
function AuthorDao(config, hasher, broker) {

    BaseDao.call(this, config, hasher, broker);

    /**
     * Retrieve a single author.
     *
     * @param  {String}   slug Author's slug.
     * @param  {Function} cb   Fired with data from remote server,
     *                         with error otherwise.
     * @return {undefined}
     */
    this.getAuthorBySlug = function(slug, cb) {
        var uri = this.getAdminUri();
            uri += '?action=rip_authors_get_author_by_slug';
            uri += '&slug=' + slug;

        var hash = this.hasher.getHash(uri);

        this.broker.setTime(120).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };

    /**
     * Retrieve all riplive authors.
     * Accept a criteria object with
     * this params:
     * {
     *     count  : count,
     *     page   : page
     * }
     * 
     * @param  {Function} cb   Filled with data from remote server,
     *                         or with error otherwise.
     * @return {undefined}
     */
    this.getAllAuthors = function(criteria, cb) {
        var uri = this.getAdminUri();
            uri += '?action=rip_authors_get_all_authors';

        var hash = this.hasher.getHash(uri);

        this.broker.setTime(600).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };
};


// Inherits
// from BaseDao
util.inherits(AuthorDao, BaseDao);

module.exports = AuthorDao;
