var util = require('util')
var BaseDao = require(__dirname + '/base-dao.js');

/**
 * Song Data Access Object.
 * Map the song object on the remote
 * Worpress server.
 * Use the broker to retrieve and save data from / to memcached.
 * Each method map the remote Wordpress song's data uri.
 */
function SongDao(config, hasher, broker) {
    
    BaseDao.call(this, config, hasher, broker);
    
    /**
     * Return a specific song.
     *
     * @param  {String}   slug Song's slug.
     * @param  {Function} cb   Fired with data from remote server,
     *                         with error otherwise.
     * @return {undefined}
     */
    this.getSongBySlug = function(slug, cb) {
        var uri = this.getAdminUri();
            uri += '?action=rip_songs_get_song_by_slug';
            uri += '&slug=' + slug;

        var hash = this.hasher.getHash(uri);

        this.broker.setTime(120).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };

    /**
     * Retrieve all songs.
     *
     * @param  {Int}      count  Number of items to retrieve.
     * @param  {Int}      page   Number of page.
     * @param  {String}   divide Divide the result set by alphabetical
     *                           letter.
     * @param  {Function} cb Fired with data from remote server,
     *                       error otherwise
     * @return {undefined}
     */
    this.getAllSongs = function(criteria, cb) {
        var uri = this.getAdminUri();
            uri += '?action=rip_songs_get_all_songs'; 
            uri += '&count=' + criteria.count;
            uri += '&page='  + criteria.page;
            uri += typeof criteria.divide !== 'undefined' ? '&divide=true' : '';

        var hash = this.hasher.getHash(uri);

        this.broker.setTime(120).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };

    /**
     * Retrieve all songs
     * within a specific genre.
     *
     * @param  {String}   slug   Genre's slug.
     * @param  {Int}      count  Number of items to retrieve.
     * @param  {Int}      page   Number of page.
     * @param  {String}   divide Divide the result set by alphabetical
     *                           letter.
     * @param  {Function} cb Fired with data from remote server,
     *                       error otherwise
     * @return {undefined}
     */
    this.getSongsByGenre = function(slug, criteria, cb) {
        var uri = this.getAdminUri();
            uri += '?action=rip_songs_get_all_songs_by_genre_slug';
            uri += '&slug='  + slug;
            uri += '&count=' + criteria.count;
            uri += '&page='  + criteria.page; 
            uri += typeof criteria.divide !== 'undefined' ? '&divide=true' : '';

        var hash = this.hasher.getHash(uri);

        this.broker.setTime(120).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };

    /**
     * Return all songs within a specific
     * tag.
     *
     * @param  {String}   slug   Tag's slug.
     * @param  {Int}      count  Number of items to retrieve.
     * @param  {Int}      page   Number of page.
     * @param  {String}   divide Divide the result set by alphabetical
     *                           letter.
     * @param  {Function} cb Fired with data from remote server,
     *                       error otherwise
     * @return {undefined}
     */
    this.getSongsByTag = function(slug, criteria, cb) {
        var uri = this.getAdminUri();
        uri += '?action=rip_songs_get_all_songs_by_tag_slug';
        uri += '&slug='  + slug;
        uri += '&count=' + criteria.count;
        uri += '&page='  + criteria.page;
        uri += typeof criteria.divide !== 'undefined' ? '&divide=true' : '';

        var hash = this.hasher.getHash(uri);

        this.broker.setTime(120).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };

    /**
     * Return all songs genres.
     *
     * @param  {Function} cb Fired with data from remote server,
     *                       with error otherwise.
     * @return {undefined}
     */
    this.getSongsGenres = function(cb) {
        var uri = this.getAdminUri();
            uri += '?action=rip_songs_get_songs_genres';
        
        var hash = this.hasher.getHash(uri);

        this.broker.setTime(120).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };
};

// Inherits
// from BaseDao
util.inherits(SongDao, BaseDao);

module.exports = SongDao;
