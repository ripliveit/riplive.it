var config      = require('config');
var memcached   = require(__dirname + '/../services/memcached-client.js');
var HttpService = require(__dirname + '/../services/http-service.js');
var hasher      = require(__dirname + '/../services/hasher.js');
var Broker      = require(__dirname + '/../services/memcached-broker.js');
var PodcastDao  = require('../daos/podcast.js');

var broker      = new Broker(memcached, HttpService);
var podcast     = new PodcastDao(config, hasher, broker);

/**
 * Return all podcasts.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getAllPodcasts = function(req, res, next) {
    var criteria = {
        count: req.query.count || 24,
        page: req.query.page || 1
    };

    podcast.getAllPodcasts(criteria, function(err, data) {
        if (err) return next(err);

        res.send(JSON.parse(data));
    });
};

/**
 * Return all podcast of a specific program.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getAllPodcastsByProgramSlug = function(req, res, next) {
    var slug = req.param('program_slug');
    var criteria = {
        count: req.query.count || 24,
        page: req.query.page || 1
    };

    podcast.getAllPodcastsByProgramSlug(slug, criteria, function(err, data) {
        if (err) return next(err);

        res.send(JSON.parse(data));
    });
};

/**
 * Return a specific podcast.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getPodcastById = function(req, res, next) {
    var id = req.param('id');

    podcast.getPodcastById(id, function(err, data) {
        if (err) return next(err);

        res.send(JSON.parse(data));
    });
};
