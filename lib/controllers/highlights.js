var HighlightDao = require('../daos/highlight.js');


/**
 * Return a list of all highlights.
 *
 * @param  {Function} req
 * @param  {Function} res
 * @param  {Function} next
 * @return {string}
 */
exports.getHighlights = function(req, res, next) {
    var count = req.query.count || 6;
    var page = req.query.page || 1;
    var highlight = new HighlightDao();

    highlight.getHighlights(count, page, function(err, data) {
        if (err) {
            return next(err);
        }

        res.send(JSON.parse(data));
    });
};
