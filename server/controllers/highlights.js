var HighlightDao = require('../daos/highlight.js');
var highlight = new HighlightDao();

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

        res.send(JSON.parse(data));
    });
};
