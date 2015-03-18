var SeoDao = require('../daos/seo.js');
var seoDao = new SeoDao();

/**
 * Return the xml Sitemap (remotelly generated)
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getSiteMap = function(req, res, next) {
    seoDao.getSiteMap(function(err, data) {
        if (err) return next(err);

        res.header('Content-Type','text/xml').send(data);
    });
};
