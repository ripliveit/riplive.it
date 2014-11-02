var app = require('../../app');
var hasher = require('../services/hasher.js');
var broker = require('../services/memcached-broker.js');

/**
 * Podcast Data Access Object.
 * Implement method to retrieve and manipulate Podcast Object.
 * Use the Broker to retrieve and save data to / from memcached.
 */
function PodcastDao() {

    /**
     * Return a single podcast.
     *
     * @param  {Number}   id    Podcast's id.
     * @param  {Function} cb Filled with data from remote server,
     *                       with error otherwise.
     * @return {undefined}
     */
    this.getPodcastById = function(id, cb) {
        var uri = app.get('admin_uri');
            uri += '?action=rip_podcasts_get_podcast_by_id';
            uri += '&id_podcast=' + id;

        var hash = hasher.getHash(uri);

        broker.setTime(120).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };

    /**
     * Return all podcasts.
     * Accept a criteria object with
     * this params:
     * {
     *     count  : count,
     *     page   : page
     * }
     *
     * @param  {Object} criteria 
     * @param  {Function} cb Filled with data from remote server,
     *                       with error otherwise.
     * @return {undefined}
     */
    this.getAllPodcasts = function(criteria, cb) {
        var uri = app.get('admin_uri');
            uri += '?action=rip_podcasts_get_all_podcasts';
            uri += '&count=' + criteria.count;
            uri += '&page='  + criteria.page;

        var hash = hasher.getHash(uri);

        broker.setTime(30).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);
            
            cb(null, data);
        });
    };

    /**
     * Return all podcasts of
     * a specific program.
     * Accept a criteria object with
     * this params:
     * {
     *     count  : count,
     *     page   : page
     * }
     * 
     * @param  {String} slug Program's slug.
     * @param  {Object} criteria  
     * @param  {Function} cb Filled with data from remote server,
     *                       with error otherwise.
     * @return {undefined}
     */
    this.getAllPodcastsByProgramSlug = function(slug, criteria, cb) {
        var uri = app.get('admin_uri');
            uri += '?action=rip_podcasts_get_all_podcasts_by_program_slug';
            uri += '&slug='  + slug;
            uri += '&count=' + criteria.count;
            uri += '&page='  + criteria.page;

        var hash = hasher.getHash(uri);

        broker.setTime(120).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };
};

module.exports = PodcastDao;
