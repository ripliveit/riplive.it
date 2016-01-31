var config       = require('config');
var memcached   = require(__dirname + '/../utils/memcached-client.js');
var HttpService = require(__dirname + '/../utils/http.js');
var hasher      = require(__dirname + '/../utils/hasher.js');
var Broker      = require(__dirname + '/../utils/memcached-broker.js');
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
exports.getHighlights = (req, res, next) => {
    var criteria = {
        count: req.query.count || 6,
        page: req.query.page || 1
    };

    highlight.getHighlights(criteria, (err, data) => {
        if (err) return next(err);

        try {
            var parsed = JSON.parse(data);

            res.status(parsed.code).send(parsed);
        } catch(e) {
            return next(e);
        }
    });
};
