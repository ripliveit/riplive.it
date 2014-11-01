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
     * Accept a criteria object with
     * this params:
     * {
     *     count  : count,
     *     page   : page,
     *     divide : divide
     * }
     * 
     * @param  {String}   slug Artist's slug.
     * @param  {Function} cb   Fired with data from remote server,
     *                         with error otherwise.
     * @return {undefined}
     */
    this.getArtistBySlug = function(slug, cb) {
        var uri = app.get('admin_uri'); 
            uri += '?action=rip_artists_get_artist_by_slug';
            uri += '&slug=' + slug;

        var hash = hasher.getHash(uri);
        
        broker.setTime(120).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };

    /**
     * Return all artists.
     * Accept a criteria object with
     * this params:
     * {
     *     count  : count,
     *     page   : page,
     *     divide : divide
     * }
     * 
     * @param  {Object}   criteria 
     * @param  {Function} cb   Fired with data from remote server,
     *                         or with error otherwise.
     * @return {undefined}
     */
    this.getAllArtists = function(criteria, cb) {
        var uri = app.get('admin_uri');
            uri += '?action=rip_artists_get_all_artists';
            uri += '&count=' + criteria.count;
            uri += '&page='  + criteria.page;
            uri += typeof criteria.divide !== 'undefined' ? '&divide=true' : '';

        var hash = hasher.getHash(uri);

        broker.setTime(350).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };

    /**
     * Return all artists 
     * of a specific genre.
     * Accept a criteria object with
     * this params:
     * {
     *     count  : count,
     *     page   : page,
     *     divide : divide
     * }
     * 
     * @param  {Function} cb   Fired with data from remote server,
     *                         with error otherwise.
     * @return {undefined}
     */
    this.getArtistsByGenre = function(slug, criteria, cb) {
        var uri = app.get('admin_uri'); 
            uri += '?action=rip_artists_get_all_artists_by_genre_slug';
            uri += '&count=' + criteria.count;
            uri += '&page='  + criteria.page;
            uri += '&slug='  + slug;
            uri += typeof criteria.divide !== 'undefined' ? '&divide=true' : '';

        var hash = hasher.getHash(uri);

        broker.setTime(350).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };

    /**
     * Return all artist
     * within a specific tag.
     * Accept a criteria object with
     * this params:
     * {
     *     count  : count,
     *     page   : page,
     *     divide : divide
     * }
     * 
     * @param  {Function} cb   Fired with data from remote server,
     *                         with error otherwise.
     * @return {undefined}
     */
    this.getArtistsByTag = function(slug, criteria, cb) {
        var uri = app.get('admin_uri');
            uri += '?action=rip_artists_get_all_artists_by_tag_slug';
            uri += '&count=' + criteria.count;
            uri += '&page='  + criteria.page;
            uri += '&slug='  + slug;
            uri += typeof criteria.divide !== 'undefined' ? '&divide=true' : '';

        var hash = hasher.getHash(uri);

        broker.setTime(350).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);
            
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
            if (err) return cb(err, null);

            cb(null, data);
        });
    };
};

module.exports = ArtistDao;
