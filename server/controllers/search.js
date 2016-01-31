var config      = require('config');
var memcached   = require(__dirname + '/../utils/memcached-client.js');
var HttpService = require(__dirname + '/../utils/http.js');
var hasher      = require(__dirname + '/../utils/hasher.js');
var Broker      = require(__dirname + '/../utils/memcached-broker.js');
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
exports.getSearchResults = (req, res, next) => {
    var criteria = {
        search : req.query.search,
        type   : req.query.type,
        count  : req.query.count || 24,
        page   : req.query.page || 1
    };
    
    searchDao.getSearchResults(criteria, (err, data) => {
        if (err) return next(err);

        try {
            var parsed = JSON.parse(data);

            res.status(200).send(parsed);
        } catch(e) {
            return next(e);
        }
    });
};
