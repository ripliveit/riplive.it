var SearchDao = require('../daos/search.js');
var searchDao = new SearchDao();

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
