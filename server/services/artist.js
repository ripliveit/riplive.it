'use strict';

/**
 * Artist Data Access Object.
 * Implement method to retrieve and manipulate Artist Object.
 * Use the Broker to retrieve and save data to / from memcached.
 */

let util = require('util');
let config = require('config');
let broker = require('../utils/memcached-broker.js');

/**
 * Return a single artist.
 *
 * @param  {String}   slug Artist's slug.
 * @param  {Function} cb   Fired with data from remote server,
 *                         with error otherwise.
 * @return {undefined}
 */
const getArtistBySlug = (slug, cb) => {
    let uri = config.admin_uri;
        uri += '?action=rip_artists_get_artist_by_slug';
        uri += '&slug=' + slug;

    const hash = hasher.getHash(uri);

    broker.setTime(120);
    broker.get(hash, uri, function(err, data) {
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
const getAllArtists = (criteria, cb) => {
    let uri = config.admin_uri;
        uri += '?action=rip_artists_get_all_artists';
        uri += '&count=' + criteria.count;
        uri += '&page='  + criteria.page;
        uri += typeof criteria.divide !== 'undefined' ? '&divide=true' : '';

    const hash = hasher.getHash(uri);

    broker.setTime(350);
    broker.get(hash, uri, function(err, data) {
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
const getArtistsByGenre = (slug, criteria, cb) => {
    let uri = config.admin_uri;
        uri += '?action=rip_artists_get_all_artists_by_genre_slug';
        uri += '&count=' + criteria.count;
        uri += '&page='  + criteria.page;
        uri += '&slug='  + slug;
        uri += typeof criteria.divide !== 'undefined' ? '&divide=true' : '';

    const hash = hasher.getHash(uri);

    broker.setTime(350);
    broker.get(hash, uri, function(err, data) {
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
const getArtistsByTag = (slug, criteria, cb) => {
    let uri = config.admin_uri;
        uri += '?action=rip_artists_get_all_artists_by_tag_slug';
        uri += '&count=' + criteria.count;
        uri += '&page='  + criteria.page;
        uri += '&slug='  + slug;
        uri += typeof criteria.divide !== 'undefined' ? '&divide=true' : '';

    const hash = hasher.getHash(uri);

    broker.setTime(350);
    broker.get(hash, uri, function(err, data) {
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
const getArtistsGenres = cb => {
    let uri = config.admin_uri;
        uri += '?action=rip_artists_get_artists_genres';

    const hash = hasher.getHash(uri);

    broker.setTime(350);
    broker.get(hash, uri, function(err, data) {
        if (err) return cb(err, null);

        cb(null, data);
    });
};

module.exports = {
    getArtistBySlug: getArtistBySlug,
    getAllArtists: getAllArtists,
    getArtistsByGenre: getArtistsByGenre,
    getArtistsByTag: getArtistsByTag,
    getArtistsGenres: getArtistsGenres
};
