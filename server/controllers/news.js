var NewsDao = require('../daos/news.js');
var news = new NewsDao();

/**
 * Return a list of news.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getAllNews = function(req, res, next) {
    var criteria = {
        count: req.query.count  || 24,
        page : req.query.page   || 1,
        author: req.query.author || null
    };

    news.getAllNews(criteria, function(err, data) {
        if (err) return next(err);

        res.send(JSON.parse(data));
    });
};

/**
 * Return a specific news.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getNewsBySlug = function(req, res, next) {
    var slug = req.param('slug');
    var criteria = {
        count: req.query.count || 24,
        page: req.query.page || 1
    };

    news.getNewsBySlug(slug, function(err, data) {
        if (err) return next(err);

        res.send(JSON.parse(data));
    });
};

/**
 * Return all news within a specific category.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getNewsByCategory = function(req, res, next) {
    var slug = req.param('slug');
    var criteria = {
        count: req.query.count || 24,
        page: req.query.page || 1
    };

    news.getNewsByCategory(slug, criteria, function(err, data) {
        if (err) return next(err);

        res.send(JSON.parse(data));
    });
};

/**
 * Return all news within a specific tags.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getNewsByTag = function(req, res, next) {
    var slug = req.param('slug');
    var criteria = {
        count: req.query.count || 24,
        page: req.query.page || 1
    };

    news.getNewsByTag(slug, criteria, function(err, data) {
        if (err) return next(err);

        res.send(JSON.parse(data));
    });
};
