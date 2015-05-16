var config      = require('config');
var memcached   = require(__dirname + '/../services/memcached-client.js');
var HttpService = require(__dirname + '/../services/http-service.js');
var hasher      = require(__dirname + '/../services/hasher.js');
var Broker      = require(__dirname + '/../services/memcached-broker.js');
var ArtistDao   = require('../daos/artist.js');

var broker      = new Broker(memcached, HttpService);
var artist      = new ArtistDao(config, hasher, broker);

/**
 * Return a list of artists.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getAllArtists = function(req, res, next) {
    var criteria = {
        count: req.query.count || 24,
        page: req.query.page || 1,
        divide: req.query.divide
    };

    artist.getAllArtists(criteria, function(err, data) {
        if (err) return next(err);
        
        try {
            var parsed = JSON.parse(data);

            res.send(parsed.code, parsed);
        } catch(e) {
            return next(e);
        }
    });
};

/**
 * Return a specific artist.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getArtistBySlug = function(req, res, next) {
    var slug = req.param('slug');

    artist.getArtistBySlug(slug, function(err, data) {
        if (err) return next(err);
        
        try {
            var parsed = JSON.parse(data);

            res.send(parsed.code, parsed);
        } catch(e) {
            return next(e);
        }
    });
};

/**
 * Return a list of artists,
 * grabbed by their genre.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getArtistsByGenre = function(req, res, next) {
    var slug = req.param('slug');
    var criteria = {
        count: req.query.count || 24,
        page: req.query.page || 1,
        divide: req.query.divide
    };

    artist.getArtistsByGenre(slug, criteria, function(err, data) {
        if (err) return next(err);
        
        try {
            var parsed = JSON.parse(data);

            res.send(parsed.code, parsed);
        } catch(e) {
            return next(e);
        }
    });
};

/**
 * Return a list of artists,
 * grabbed by their tags.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getArtistsByTag = function(req, res, next) {
    var slug = req.param('slug');
    var criteria = {
        count: req.query.count || 24,
        page: req.query.page || 1,
        divide: req.query.divide
    };

    artist.getArtistsByTag(slug, criteria, function(err, data) {
        if (err) return next(err);

        try {
            var parsed = JSON.parse(data);

            res.send(parsed.code, parsed);
        } catch(e) {
            return next(e);
        }
    });
};

/**
 * Return all artists's genres.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getArtistsGenres = function(req, res, next) {
    artist.getArtistsGenres(function(err, data) {
        if (err) return next(err);

        try {
            var parsed = JSON.parse(data);

            res.send(parsed.code, parsed);
        } catch(e) {
            return next(e);
        }
    });
};
