var config      = require('config');
var memcached   = require(__dirname + '/../utils/memcached-client.js');
var HttpService = require(__dirname + '/../utils/http.js');
var hasher      = require(__dirname + '/../utils/hasher.js');
var Broker      = require(__dirname + '/../utils/memcached-broker.js');
var NewsDao     = require('../daos/news.js');

var broker      = new Broker(memcached, HttpService);
var news        = new NewsDao(config, hasher, broker);

/**
 * Return a list of news.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getAllNews = (req, res, next) => {
    var criteria = {
        count: req.query.count  || 24,
        page : req.query.page   || 1,
        author: req.query.author || null
    };

    news.getAllNews(criteria, (err, data) => {
        if (err) return next(err);

        try {
            var parsed = JSON.parse(data);

            res.status(200).send(parsed);
        } catch(e) {
            return next(e);
        }
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
exports.getNewsBySlug = (req, res, next) => {
    var slug = req.params.slug;
    var criteria = {
        count: req.query.count || 24,
        page: req.query.page || 1
    };

    news.getNewsBySlug(slug, (err, data) => {
        if (err) return next(err);

        try {
            var parsed = JSON.parse(data);

            res.status(200).send(parsed);
        } catch(e) {
            return next(e);
        }
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
exports.getNewsByCategory = (req, res, next) => {
    var slug = req.params.slug;
    var criteria = {
        count: req.query.count || 24,
        page: req.query.page || 1
    };

    news.getNewsByCategory(slug, criteria, (err, data) => {
        if (err) return next(err);

        try {
            var parsed = JSON.parse(data);

            res.status(200).send(parsed);
        } catch(e) {
            return next(e);
        }
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
exports.getNewsByTag = (req, res, next) => {
    var slug = req.params.slug;
    var criteria = {
        count: req.query.count || 24,
        page: req.query.page || 1
    };

    news.getNewsByTag(slug, criteria, (err, data) => {
        if (err) return next(err);

        try {
            var parsed = JSON.parse(data);

            res.status(200).send(parsed);
        } catch(e) {
            return next(e);
        }
    });
};
