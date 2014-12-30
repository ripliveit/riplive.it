var PodcastDao = require('../daos/podcast.js');
var podcast = new PodcastDao();

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
