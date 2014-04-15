var NewsDao = require('../daos/news.js');


/**
 * Return a list of news.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {string}
 */
exports.getAllNews = function(req, res, next) {
    var page = req.query.page || 1;
    var count = req.query.count || 24;
    var news = new NewsDao();

    news.getAllNews(count, page, function(err, data) {
        if (err) {
            return next(err);
        }

        res.send(JSON.parse(data));
    });
};


/**
 * Return a specific news.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {string}
 */
exports.getNewsBySlug = function(req, res, next) {
    var slug = req.param('slug');
    var news = new NewsDao();

    news.getNewsBySlug(slug, function(err, data) {
        if (err) {
            return next(err);
        }

        res.send(JSON.parse(data));
    });
};


/**
 * Return all news within a specific category.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {string}
 */
exports.getNewsByCategory = function(req, res, next) {
    var slug = req.param('slug');
    var count = req.query.count || 24;
    var page = req.query.page || 1;
    var news = new NewsDao();

    news.getNewsByCategory(slug, count, page, function(err, data) {
        if (err) {
            return next(err);
        }

        res.send(JSON.parse(data));
    });
};


/**
 * Return all news within a specific tags.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {string}
 */
exports.getNewsByTag = function(req, res, next) {
    var slug = req.param('slug');
    var count = req.query.count || 24;
    var page = req.query.page || 1;
    var news = new NewsDao();

    news.getNewsByTag(slug, count, page, function(err, data) {
        if (err) {
            return next(err);
        }

        res.send(JSON.parse(data));
    });
};
