var app = require('../../app');
var hasher = require('../services/hasher.js');
var broker = require('../services/memcached-broker.js');

/**
 * News Data Access Object.
 * Implement method to retrieve and manipulate News Object.
 * Use the Broker to retrieve and save data to / from memcached.
 */
var NewsDao = function() {

    /**
     * Return a single news.
     * 
     * @param  {String}   slug [description]
     * @param  {Function} cb Fired with data from remote server,
     *                       with error otherwise.
     * @return {undefined}
     */
    this.getNewsBySlug = function(slug, cb) {
        var uri = app.get('wp_uri') + '/get_post/?slug=' + slug;
        var hash = hasher.getHash(uri);

        broker.setTime(120).get(hash, uri, function(err, data) {
            if (err) {
                return cb(err, null);
            }

            cb(null, data);
        });
    };

    /**
     * Return all riplive news.
     * 
     * @param  {Int}   count Number of items to retrieve.
     * @param  {Int}   page  Number of page.
     * @param  {Function} cb Fired with data from remote server,
     *                       with error otherwise.
     * @return {undefined}
     */
    this.getAllNews = function(count, page, cb) {
        var uri = app.get('wp_uri') + '/get_recent_posts/?page=' + page + '&count=' + count;
        var hash = hasher.getHash(uri);

        broker.setTime(30).get(hash, uri, function(err, data) {
            if (err) {
                return cb(err, null);
            }

            cb(null, data);
        });
    };

    /**
     * Return all news within
     * a specific category.
     * 
     * @param  {String} slug 
     * @param  {Int}   count Number of items to retrieve.
     * @param  {Int}   page  Number of page.
     * @param  {Function} cb Fired with data from remote server,
     *                       with error otherwise.
     * @return {undefined}
     */
    this.getNewsByCategory = function(slug, count, page, cb) {
        var uri = app.get('wp_uri') + '/get_category_posts/?slug=' + slug;
            uri += '&page=' + page + '&count=' + count;
        var hash = hasher.getHash(uri);

        broker.setTime(120).get(hash, uri, function(err, data) {
            if (err) {
                return cb(err, null);
            }

            cb(null, data);
        });
    };

    /**
     * Return all news with a specific tag.
     * 
     * @param  {String} slug Tag's slug.
     * @param  {Int}   count Number of items to retrieve.
     * @param  {Int}   page  Number of page.
     * @param  {Function} cb Fired with data from remote server,
     *                       with error otherwise.
     * @return {undefined}
     */
    this.getNewsByTag = function(slug, count, page, cb) {
        var uri = app.get('wp_uri') + '/get_tag_posts/?slug=' + slug;
            uri += '&page=' + page + '&count=' + count;
        var hash = hasher.getHash(uri);

        broker.setTime(120).get(hash, uri, function(err, data) {
            if (err) {
                return cb(err, null);
            }

            cb(null, data);
        });
    };
};

module.exports = NewsDao;
