var app = require('../../app');
var hasher = require('../services/hasher.js');
var broker = require('../services/memcached-broker.js');

/**
 * Author Data Access Object.
 * Implement method to retrieve and manipulate Author Object.
 * Use the Broker to retrieve and save data to / from memcached.
 */
function AuthorDao() {

    /**
     * Retrieve a single author.
     *
     * @param  {String}   slug Author's slug.
     * @param  {Function} cb   Fired with data from remote server,
     *                         with error otherwise.
     * @return {undefined}
     */
    this.getAuthorBySlug = function(slug, cb) {
        var uri = app.get('admin_uri');
            uri += '?action=rip_authors_get_author_by_slug';
            uri += '&slug=' + slug;

        var hash = hasher.getHash(uri);

        broker.setTime(120).get(hash, uri, function(err, data) {
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
     *     page   : page,
     *     divide : divide
     * }
     * 
     * @param  {Function} cb   Filled with data from remote server,
     *                         or with error otherwise.
     * @return {undefined}
     */
    this.getAllAuthors = function(criteria, cb) {
        var uri = app.get('admin_uri') + '?action=rip_authors_get_all_authors';
        var hash = hasher.getHash(uri);

        broker.setTime(600).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };
};

module.exports = AuthorDao;
