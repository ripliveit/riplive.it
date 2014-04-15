var app = require('../../app');
var hasher = require('../services/hasher.js');
var broker = require('../services/memcached-broker.js');

/**
 * Label Data Access Object.
 * Implement method to retrieve and manipulate Label Object.
 * Use the Broker to retrieve and save data to / from memcached.
 */
var LabelDao = function() {

    /**
     * Return a single label.
     *
     * @param  {String}   slug Label's slug.
     * @param  {Function} cb   Fired with data from remote server,
     *                         with error otherwise.
     * @return {undefined}
     */
    this.getLabelBySlug = function(slug, cb) {
        var uri = app.get('wp_uri') + '/get_post/?slug=' + slug + '&post_type=labels';
        var hash = hasher.getHash(uri);

        broker.setTime(120).get(hash, uri, function(err, data) {
            if (err) {
                return cb(err, null);
            }

            cb(null, data);
        });
    };

    /**
     * Return all labels.
     *
     * @param  {Int}   page  Number of page.
     * @param  {Function} cb Fired with data from remote server,
     *                       with error otherwise.
     * @return {undefined}
     */
    this.getAllLabels = function(page, cb) {
        var uri = app.get('wp_uri') + '/get_posts/?post_type=labels&page=' + page;
        var hash = hasher.getHash(uri);

        broker.setTime(120).get(hash, uri, function(err, data) {
            if (err) {
                return cb(err, null);
            }

            cb(null, data);
        });
    };

    /**
     * Return all labels of a
     * specific genre (press-office, booking, etichette).
     *
     * @param  {String}   slug The genre slug.
     * @param  {Int}      page Number of page.
     * @param  {Function} cb   Fired with data from remote server,
     *                         with error otherwise.
     * @return {undefined}
     */
    this.getLabelsByGenre = function(slug, page, cb) {
        var uri = app.get('wp_uri') + '/get_posts/?post_type=labels&label-genre=' + slug;
            uri += '&page=' + page;
        var hash = hasher.getHash(uri);

        broker.setTime(120).get(hash, uri, function(err, data) {
            if (err) {
                return cb(err, null);
            }

            cb(null, data);
        });
    };
};

module.exports = LabelDao;
