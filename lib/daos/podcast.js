var app = require('../../app');
var hasher = require('../services/hasher.js');
var broker = require('../services/memcached-broker.js');

/**
 * Podcast Data Access Object.
 * Implement method to retrieve and manipulate Podcast Object.
 * Use the Broker to retrieve and save data to / from memcached.
 */
var PodcastDao = function() {
    /**
     * Return a single podcast.
     *
     * @param  {Int}   id    Podcast's id.
     * @param  {Function} cb Fired with data from remote server,
     *                       with error otherwise.
     * @return {undefined}
     */
    this.getPodcastById = function(id, cb) {
        var uri = app.get('admin_uri') + '?action=rip_podcasts_get_podcast_by_id&id_podcast=' + id;
        var hash = hasher.getHash(uri);

        broker.setTime(120).get(hash, uri, function(err, data) {
            if (err) {
                return cb(err, null);
            }

            cb(null, data);
        });
    };

    /**
     * Return all podcasts.
     *
     * @param  {Int}   count Number of items to retrieve.
     * @param  {Int}   page  Number of page.
     * @param  {Function} cb Fired with data from remote server,
     *                       with error otherwise.
     * @return {undefined}
     */
    this.getAllPodcasts = function(count, page, cb) {
        var uri = app.get('admin_uri') + '?action=rip_podcasts_get_all_podcasts&count=' + count;
        uri += '&page=' + page;
        var hash = hasher.getHash(uri);

        broker.setTime(30).get(hash, uri, function(err, data) {
            if (err) {
                return cb(err, null);
            }

            cb(null, data);
        });
    };

    /**
     * Return all podcasts of
     * a specific program.
     *
     * @param  {String} slug Program's slug.
     * @param  {Int}   count Number of items to retrieve.
     * @param  {Int}   page  Number of page.
     * @param  {Function} cb Fired with data from remote server,
     *                       with error otherwise.
     * @return {undefined}
     */
    this.getAllPodcastsByProgramSlug = function(slug, count, page, cb) {
        var uri = app.get('admin_uri') + '?action=rip_podcasts_get_all_podcasts_by_program_slug&slug=' + slug;
        uri += '&count=' + count + '&page=' + page;
        var hash = hasher.getHash(uri);

        broker.setTime(120).get(hash, uri, function(err, data) {
            if (err) {
                return cb(err, null);
            }

            cb(null, data);
        });
    };
};

module.exports = PodcastDao;
