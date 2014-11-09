var AuthorDao = require('../daos/author.js');
var author = new AuthorDao();

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

        res.send(JSON.parse(data));
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

        res.send(JSON.parse(data));
    });
};
