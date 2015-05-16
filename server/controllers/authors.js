var config      = require('config');
var memcached   = require(__dirname + '/../services/memcached-client.js');
var HttpService = require(__dirname + '/../services/http-service.js');
var hasher      = require(__dirname + '/../services/hasher.js');
var Broker      = require(__dirname + '/../services/memcached-broker.js');
var AuthorDao   = require('../daos/author.js');

var broker      = new Broker(memcached, HttpService);
var author      = new AuthorDao(config, hasher, broker);

/**
 * Return a list of all authors.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getAllAuthors = function(req, res, next) {
    var criteria = {
        page: req.query.page || 1
    };
    
    author.getAllAuthors(criteria, function(err, data) {
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
 * Return a specific author,
 * grabbed by it's unique slug.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getAuthorBySlug = function(req, res, next) {
    var slug = req.param('slug');

    author.getAuthorBySlug(slug, function(err, data) {
        if (err) return next(err);

        try {
            var parsed = JSON.parse(data);

            res.send(parsed.code || 200, parsed);
        } catch(e) {
            return next(e);
        }
    });
};
