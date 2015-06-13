var config      = require('config');
var memcached   = require(__dirname + '/../services/memcached-client.js');
var HttpService = require(__dirname + '/../services/http-service.js');
var hasher      = require(__dirname + '/../services/hasher.js');
var Broker      = require(__dirname + '/../services/memcached-broker.js');
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
exports.getAllNews = function(req, res, next) {
    var criteria = {
        count: req.query.count  || 24,
        page : req.query.page   || 1,
        author: req.query.author || null
    };

    news.getAllNews(criteria, function(err, data) {
        if (err) return next(err);

        try {
            var parsed = JSON.parse(data);

            res.send(200, parsed);
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
exports.getNewsBySlug = function(req, res, next) {
    var slug = req.param('slug');
    var criteria = {
        count: req.query.count || 24,
        page: req.query.page || 1
    };

    news.getNewsBySlug(slug, function(err, data) {
        if (err) return next(err);

        try {
            var parsed = JSON.parse(data);

            res.send(200, parsed);
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
exports.getNewsByCategory = function(req, res, next) {
    var slug = req.param('slug');
    var criteria = {
        count: req.query.count || 24,
        page: req.query.page || 1
    };

    news.getNewsByCategory(slug, criteria, function(err, data) {
        if (err) return next(err);

        try {
            var parsed = JSON.parse(data);

            res.send(200, parsed);
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
exports.getNewsByTag = function(req, res, next) {
    var slug = req.param('slug');
    var criteria = {
        count: req.query.count || 24,
        page: req.query.page || 1
    };

    news.getNewsByTag(slug, criteria, function(err, data) {
        if (err) return next(err);

        try {
            var parsed = JSON.parse(data);

            res.send(200, parsed);
        } catch(e) {
            return next(e);
        }
    });
};
