var util = require('util')
var BaseDao = require(__dirname + '/base-dao.js');

/**
 * Artist Data Access Object.
 * Implement method to retrieve and manipulate Artist Object.
 * Use the Broker to retrieve and save data to / from memcached.
 */
function ArtistDao() {

    BaseDao.call(this);

    /**
     * Return a single artist.
     * 
     * @param  {String}   slug Artist's slug.
     * @param  {Function} cb   Fired with data from remote server,
     *                         with error otherwise.
     * @return {undefined}
     */
    this.getArtistBySlug = function(slug, cb) {
        var uri = this.getAdminUri();
            uri += '?action=rip_artists_get_artist_by_slug';
            uri += '&slug=' + slug;

        var hash = this.hasher.getHash(uri);
        
        this.broker.setTime(120).get(hash, uri, function(err, data) {
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
        var uri = this.getAdminUri();
            uri += '?action=rip_artists_get_all_artists';
            uri += '&count=' + criteria.count;
            uri += '&page='  + criteria.page;
            uri += typeof criteria.divide !== 'undefined' ? '&divide=true' : '';

        var hash = this.hasher.getHash(uri);

        this.broker.setTime(350).get(hash, uri, function(err, data) {
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
        var uri = this.getAdminUri();
            uri += '?action=rip_artists_get_all_artists_by_genre_slug';
            uri += '&count=' + criteria.count;
            uri += '&page='  + criteria.page;
            uri += '&slug='  + slug;
            uri += typeof criteria.divide !== 'undefined' ? '&divide=true' : '';

        var hash = this.hasher.getHash(uri);

        this.broker.setTime(350).get(hash, uri, function(err, data) {
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
        var uri = this.getAdminUri();
            uri += '?action=rip_artists_get_all_artists_by_tag_slug';
            uri += '&count=' + criteria.count;
            uri += '&page='  + criteria.page;
            uri += '&slug='  + slug;
            uri += typeof criteria.divide !== 'undefined' ? '&divide=true' : '';

        var hash = this.hasher.getHash(uri);

        this.broker.setTime(350).get(hash, uri, function(err, data) {
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
        var uri = this.getAdminUri();
            uri += '?action=rip_artists_get_artists_genres';
        var hash = this.hasher.getHash(uri);
        
        this.broker.setTime(350).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };
};

// Inherits
// from BaseDao
util.inherits(ArtistDao, BaseDao);

module.exports = ArtistDao;
