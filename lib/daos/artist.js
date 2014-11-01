var app = require('../../app');
var hasher = require('../services/hasher.js');
var broker = require('../services/memcached-broker.js');

/**
 * Artist Data Access Object.
 * Implement method to retrieve and manipulate Artist Object.
 * Use the Broker to retrieve and save data to / from memcached.
 */
function ArtistDao() {

    /**
     * Return a single artist.
     * 
     * @param  {String}   slug Artist's slug.
     * @param  {Function} cb   Fired with data from remote server,
     *                         with error otherwise.
     * @return {undefined}
     */
    this.getArtistBySlug = function(slug, cb) {
        var uri = app.get('admin_uri') + '?action=rip_artists_get_artist_by_slug&slug=' + slug;
        var hash = hasher.getHash(uri);

        broker.setTime(120).get(hash, uri, function(err, data) {
            if (err) {
                return cb(err, null);
            }

            cb(null, data);
        });
    };

    /**
     * Return all artists.
     * 
     * @param  {Int}    count  Number of items to retrieve.
     * @param  {Int}    page   Number of page.
     * @param  {String} divide Divide the result set by alphabetical
     *                           letter.
     * @param  {Function} cb   Fired with data from remote server,
     *                         with error otherwise.
     * @return {undefined}
     */
    this.getAllArtists = function(criteria, cb) {
        var uri = app.get('admin_uri') + '?action=rip_artists_get_all_artists&count=' + criteria.count;
        uri += '&page=' + criteria.page;
        uri += typeof criteria.divide !== 'undefined' ? '&divide=true' : '';

        var hash = hasher.getHash(uri);

        broker.setTime(350).get(hash, uri, function(err, data) {
            if (err) {
                return cb(err, null);
            }

            cb(null, data);
        });
    };

    /**
     * Return all artists 
     * of a specific genre.
     * 
     * @param  {Int}    count  Number of items to retrieve.
     * @param  {Int}    page   Number of page.
     * @param  {String} divide Divide the result set by alphabetical
     *                         letter.
     * @param  {Function} cb   Fired with data from remote server,
     *                         with error otherwise.
     * @return {undefined}
     */
    this.getArtistsByGenre = function(slug, criteria, cb) {
        var uri = app.get('admin_uri') + '?action=rip_artists_get_all_artists_by_genre_slug&count=' + criteria.count; 
        uri += '&page=' + criteria.page + '&slug=' + slug;
        uri += typeof criteria.divide !== 'undefined' ? '&divide=true' : '';

        var hash = hasher.getHash(uri);

        broker.setTime(350).get(hash, uri, function(err, data) {
            if (err) {
                return cb(err, null);
            }

            cb(null, data);
        });
    };

    /**
     * Return all artist
     * within a specific tag.
     * 
     * @param  {Int}    count  Number of items to retrieve.
     * @param  {Int}    page   Number of page.
     * @param  {String} divide Divide the result set by alphabetical
     *                         letter.
     * @param  {Function} cb   Fired with data from remote server,
     *                         with error otherwise.
     * @return {undefined}
     */
    this.getArtistsByTag = function(slug, criteria, cb) {
        var uri = app.get('admin_uri') + '?action=rip_artists_get_all_artists_by_tag_slug&count=' + criteria.count;
        uri += '&page=' + criteria.page + '&slug=' + slug;
        uri += typeof criteria.divide !== 'undefined' ? '&divide=true' : '';

        var hash = hasher.getHash(uri);

        broker.setTime(350).get(hash, uri, function(err, data) {
            if (err) {
                return cb(err, null);
            }

            cb(null, data);
        });
    };

    /**
     * Return all artist's genres.
     * 
     * @param  {Function} cb   Fired with data from remote server,
     *                         with error otherwise.
     * @return {undefined}
     */
    this.getArtistsGenres = function(cb) {
        var uri = app.get('admin_uri') + '?action=rip_artists_get_artists_genres';
        var hash = hasher.getHash(uri);

        broker.setTime(350).get(hash, uri, function(err, data) {
            if (err) {
                return cb(err, null);
            }

            cb(null, data);
        });
    };
};

module.exports = ArtistDao;
