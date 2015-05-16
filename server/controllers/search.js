var config      = require('config');
var memcached   = require(__dirname + '/../services/memcached-client.js');
var HttpService = require(__dirname + '/../services/http-service.js');
var hasher      = require(__dirname + '/../services/hasher.js');
var Broker      = require(__dirname + '/../services/memcached-broker.js');
var SearchDao   = require('../daos/search.js');

var broker      = new Broker(memcached, HttpService);
var searchDao   = new SearchDao(config, hasher, broker);

/**
 * Make a request against the search 
 * endpoint on the remote server.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getSearchResults = function(req, res, next) {
    var criteria = {
        search : req.query.search,
        type   : req.query.type,
        count  : req.query.count || 24,
    };
    
    searchDao.getSearchResults(criteria, function(err, data) {
        if (err) return next(err);

        res.send(JSON.parse(data));
    });
};
