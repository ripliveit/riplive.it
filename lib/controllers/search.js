var SearchDao = require('../daos/search.js');

/**
 * Make a request against the search endpoint on the remote server
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {string}
 */
exports.getSearchResults = function(req, res, next) {
    var search = req.query.search;
    var type = req.query.type;
    var count = req.query.count;
    var searchDao = new SearchDao();

    searchDao.getSearchResults(search, type, count, function(err, data) {
        if (err) {
            return next(err);
        }

        res.send(JSON.parse(data));
    });
};
