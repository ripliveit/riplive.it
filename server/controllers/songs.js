var config      = require('config');
var memcached   = require(__dirname + '/../services/memcached-client.js');
var HttpService = require(__dirname + '/../services/http-service.js');
var hasher      = require(__dirname + '/../services/hasher.js');
var Broker      = require(__dirname + '/../services/memcached-broker.js');
var SongDao     = require('../daos/song.js');

var broker      = new Broker(memcached, HttpService);
var song        = new SongDao(config, hasher, broker);

/**
 * Return a list of songs.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {string}
 */
exports.getAllSongs = (req, res, next) => {
    var criteria = {
        count: req.query.count || 24,
        page: req.query.page || 1,
        divide : req.query.divide
    };

    song.getAllSongs(criteria, (err, data) => {
        if (err) return next(err);

        try {
            var parsed = JSON.parse(data);

            res.status(parsed.code).send(parsed);
        } catch(e) {
            return next(e);
        }
    });
};

/**
 * Return all songs within a genre.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getSongsByGenre = (req, res, next) => {
    var slug = req.params.slug;

    var criteria = {
        count: req.query.count || 24,
        page: req.query.page || 1,
        divide : req.query.divide
    };

    song.getSongsByGenre(slug, criteria, (err, data) => {
        if (err) return next(err);

        try {
            var parsed = JSON.parse(data);

            res.status(parsed.code).send(parsed);
        } catch(e) {
            return next(e);
        }
    });
};

/**
 * Return all songs within a tag.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getSongsByTag = (req, res, next) => {
    var slug = req.params.slug;
    var criteria = {
        count: req.query.count || 24,
        page: req.query.page || 1,
        divide : req.query.divide
    };

    song.getSongsByTag(slug, criteria, (err, data) => {
        if (err) return next(err);

        try {
            var parsed = JSON.parse(data);

            res.status(parsed.code).send(parsed);
        } catch(e) {
            return next(e);
        }
    });
};

/**
 * Return a specific song.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getSongBySlug = (req, res, next) => {
    var slug = req.params.slug;

    song.getSongBySlug(slug, (err, data) => {
        if (err) return next(err);

        try {
            var parsed = JSON.parse(data);

            res.status(parsed.code).send(parsed);
        } catch(e) {
            return next(e);
        }
    });
};

/**
 * Return all song's genres.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getSongsGenres = (req, res, next) => {
    song.getSongsGenres((err, data) => {
        if (err) return next(err);

        try {
            var parsed = JSON.parse(data);

            res.status(parsed.code).send(parsed);
        } catch(e) {
            return next(e);
        }
    });
};
