var util = require('util')
var BaseDao = require(__dirname + '/base-dao.js');

/**
 * Podcast Data Access Object.
 * Implement method to retrieve and manipulate Podcast Object.
 * Use the Broker to retrieve and save data to / from memcached.
 */
function PodcastDao() {

    BaseDao.call(this);

    /**
     * Return a single podcast.
     *
     * @param  {Number}   id    Podcast's id.
     * @param  {Function} cb Filled with data from remote server,
     *                       with error otherwise.
     * @return {undefined}
     */
    this.getPodcastById = function(id, cb) {
        var uri = this.getAdminUri();
            uri += '?action=rip_podcasts_get_podcast_by_id';
            uri += '&id_podcast=' + id;

        var hash = this.hasher.getHash(uri);

        this.broker.setTime(120).get(hash, uri, function(err, data) {
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
        var uri = this.getAdminUri();
            uri += '?action=rip_podcasts_get_all_podcasts';
            uri += '&count=' + criteria.count;
            uri += '&page='  + criteria.page;

        var hash = this.hasher.getHash(uri);

        this.broker.setTime(30).get(hash, uri, function(err, data) {
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
        var uri = this.getAdminUri();
            uri += '?action=rip_podcasts_get_all_podcasts_by_program_slug';
            uri += '&slug='  + slug;
            uri += '&count=' + criteria.count;
            uri += '&page='  + criteria.page;

        var hash = this.hasher.getHash(uri);

        this.broker.setTime(120).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };
};

// Inherits
// from BaseDao
util.inherits(PodcastDao, BaseDao);

module.exports = PodcastDao;
