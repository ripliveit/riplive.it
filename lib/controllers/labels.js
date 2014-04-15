var LabelDao = require('../daos/label.js');


/**
 * Return a list of labels.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {string}
 */
exports.getAllLabels = function(req, res, next) {
    var page = req.query.page || 1;
    var label = new LabelDao();

    label.getAllLabels(page, function(err, data) {
        if (err) {
            return next(err);
        }

        res.send(JSON.parse(data));
    });
};


/**
 * Return a specific label.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {string}
 */
exports.getLabelBySlug = function(req, res, next) {
    var slug = req.param('slug');
    var label = new LabelDao();

    label.getLabelBySlug(slug, function(err, data) {
        if (err) {
            return next(err);
        }

        res.send(JSON.parse(data));
    });
};


/**
 * Return all labels within a specific genre.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {string}
 */
exports.getLabelsByGenre = function(req, res, next) {
    var slug = req.param('slug');
    var page = req.query.page || 1;
    var label = new LabelDao();

    label.getLabelsByGenre(slug, page, function(err, data) {
        if (err) {
            return next(err);
        }

        res.send(JSON.parse(data));
    });
};
