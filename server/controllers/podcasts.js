var config      = require('config');
var memcached   = require(__dirname + '/../utils/memcached-client.js');
var HttpService = require(__dirname + '/../utils/http.js');
var hasher      = require(__dirname + '/../utils/hasher.js');
var Broker      = require(__dirname + '/../utils/memcached-broker.js');
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
exports.getAllPodcasts = (req, res, next) => {
    var criteria = {
        count: req.query.count || 24,
        page: req.query.page || 1
    };

    podcast.getAllPodcasts(criteria, (err, data) => {
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
 * Return all podcast of a specific program.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getAllPodcastsByProgramSlug = (req, res, next) => {
    var slug = req.params.program_slug;
    var criteria = {
        count: req.query.count || 24,
        page: req.query.page || 1
    };

    podcast.getAllPodcastsByProgramSlug(slug, criteria, (err, data) => {
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
 * Return a specific podcast.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getPodcastById = (req, res, next) => {
    var id = req.params.id;

    podcast.getPodcastById(id, (err, data) => {
        if (err) return next(err);

        try {
            var parsed = JSON.parse(data);

            res.status(parsed.code).send(parsed);
        } catch(e) {
            return next(e);
        }
    });
};
