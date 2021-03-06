var config      = require('config');
var memcached   = require(__dirname + '/../services/memcached-client.js');
var HttpService = require(__dirname + '/../services/http-service.js');
var hasher      = require(__dirname + '/../services/hasher.js');
var Broker      = require(__dirname + '/../services/memcached-broker.js');
var SeoDao      = require('../daos/seo.js');

var broker      = new Broker(memcached, HttpService);
var seoDao      = new SeoDao(config, hasher, broker);

/**
 * Return the xml Sitemap (remotelly generated)
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getSiteMap = (req, res, next) => {
    seoDao.getSiteMap((err, data) => {
        if (err) return next(err);

        try {
            res.header('Content-Type','text/xml').status(200).send(data);
        } catch(e) {
            return next(e);
        };
    });
};
