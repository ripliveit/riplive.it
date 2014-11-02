var app = require('../../app');
var hasher = require('../services/hasher.js');
var broker = require('../services/memcached-broker.js');

/**
 * News Data Access Object.
 * Implement method to retrieve and manipulate News Object.
 * Use the Broker to retrieve and save data to / from memcached.
 */
function NewsDao() {

    /**
     * Return a single news.
     * 
     * @param  {String}   slug
     * @param  {Function} cb Filled with data from remote server,
     *                       with error otherwise.
     * @return {undefined}
     */
    this.getNewsBySlug = function(slug, cb) {
        var uri = app.get('wp_uri');
            uri += '/get_post/';
            uri += '?slug=' + slug;

        var hash = hasher.getHash(uri);

        broker.setTime(120).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };

    /**
     * Return all riplive news.
     * Accept a criteria object with
     * this params:
     * {
     *     count  : count,
     *     page   : page
     * }
     * 
     * @param  {Object} criteria Number of items to retrieve.
     * @param  {Function} cb     Filled with data from remote server,
     *                           with error otherwise.
     * @return {undefined}
     */
    this.getAllNews = function(criteria, cb) {
        var uri = app.get('wp_uri');
            uri += '/get_recent_posts/';
            uri += '?page=' + criteria.page;
            uri += '&count=' + criteria.count;

        var hash = hasher.getHash(uri);

        broker.setTime(30).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };

    /**
     * Return all news within
     * a specific category.
     * Accept a criteria object with
     * this params:
     * {
     *     count  : count,
     *     page   : page
     * }
     * 
     * @param  {String} slug 
     * @param  {Object} criteria Number of items to retrieve.
     * @param  {Function} cb     Filled with data from remote server,
     *                           with error otherwise.
     * @return {undefined}
     */
    this.getNewsByCategory = function(slug, criteria, cb) {
        var uri = app.get('wp_uri');
            uri += '/get_category_posts/';
            uri += '?slug='  + slug;
            uri += '&page='  + criteria.page;
            uri += '&count=' + criteria.count;

        var hash = hasher.getHash(uri);

        broker.setTime(120).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };

    /**
     * Return all news with a specific tag.
     * Accept a criteria object with
     * this params:
     * {
     *     count  : count,
     *     page   : page
     * }
     * 
     * @param  {String} slug     Tag's slug.
     * @param  {Object} criteria Number of items to retrieve.
     * @param  {Function} cb     Filled with data from remote server,
     *                           with error otherwise.
     * @return {undefined}
     */
    this.getNewsByTag = function(slug, criteria, cb) {
        var uri = app.get('wp_uri');
            uri += '/get_tag_posts/';
            uri += '?slug='  + slug;
            uri += '&page='  + criteria.page;
            uri += '&count=' + criteria.count;

        var hash = hasher.getHash(uri);

        broker.setTime(120).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };
};

module.exports = NewsDao;
