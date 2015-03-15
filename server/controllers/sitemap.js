var SiteMapDao = require('../daos/sitemap.js');
var siteMap    = new SiteMapDao();

/**
 * Return the xml Sitemap (remotelly generated)
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getSiteMap = function(req, res, next) {
    siteMap.getSiteMap(function(err, data) {
        if (err) return next(err);

        res.header('Content-Type','text/xml').send(data);
    });
};
