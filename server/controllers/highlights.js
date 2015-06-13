var config       = require('config');
var memcached    = require(__dirname + '/../services/memcached-client.js');
var HttpService  = require(__dirname + '/../services/http-service.js');
var hasher       = require(__dirname + '/../services/hasher.js');
var Broker       = require(__dirname + '/../services/memcached-broker.js');
var HighlightDao = require('../daos/highlight.js');

var broker       = new Broker(memcached, HttpService);
var highlight    = new HighlightDao(config, hasher, broker);

/**
 * Return a list of all highlights.
 *
 * @param  {Function} req
 * @param  {Function} res
 * @param  {Function} next
 * @return {undefined}
 */
exports.getHighlights = function(req, res, next) {
    var criteria = {
        count: req.query.count || 6,
        page: req.query.page || 1
    };

    highlight.getHighlights(criteria, function(err, data) {
        if (err) return next(err);

        try {
            var parsed = JSON.parse(data);

            res.send(parsed.code, parsed);
        } catch(e) {
            return next(e);
        }
    });
};
