var PodcastDao = require('../daos/podcast.js');

/**
 * Return all podcasts.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {string}
 */
exports.getAllPodcasts = function(req, res, next) {
    var count = req.query.count || 24;
    var page = req.query.page || 1;
    var podcast = new PodcastDao();

    podcast.getAllPodcasts(count, page, function(err, data) {
        if (err) {
            return next(err);
        }

        res.send(JSON.parse(data));
    });
};


/**
 * Return all podcast of a specific program.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {string}
 */
exports.getAllPodcastsByProgramSlug = function(req, res, next) {
    var slug = req.param('program_slug');
    var count = req.query.count || 24;
    var page = req.query.page || 1;
    var podcast = new PodcastDao();

    podcast.getAllPodcastsByProgramSlug(slug, count, page, function(err, data) {
        if (err) {
            return next(err);
        }

        res.send(JSON.parse(data));
    });
};

/**
 * Return a specific podcast.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {string}
 */
exports.getPodcastById = function(req, res, next) {
    var id = req.param('id');
    var podcast = new PodcastDao();

    podcast.getPodcastById(id, function(err, data) {
        if (err) {
            return next(err);
        }

        res.send(JSON.parse(data));
    });
};
