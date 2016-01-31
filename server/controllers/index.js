var config      = require('config');
var memcached   = require(__dirname + '/../utils/memcached-client.js');
var HttpService = require(__dirname + '/../utils/http.js');
var hasher      = require(__dirname + '/../utils/hasher.js');
var Broker      = require(__dirname + '/../utils/memcached-broker.js');
var fs          = require('fs');
var files       = fs.readdirSync(__dirname);
var controllers = {};
var SeoDao      = require('../daos/seo.js');

var broker      = new Broker(memcached, HttpService);
var seoDao      = new SeoDao(config, hasher, broker);

/**
 * Dinamically load all controllers,
 * and exports them as an object.
 *
 * @param  {object} file
 * @return {undefined}
 */
files.forEach((file) => {
    if (file !== 'index.js') {
        controllers[file.slice(0, -3)] = require(__dirname + '/' + file);
    }
});

/**
 * Define the index controller.
 * 
 * @type {Object}
 */
controllers.index = {
    render(req, res, next) {
        seoDao.getMetaByPath(req.url, (err, data) => {
            if (err) return next();

            res.render('index', {
                meta: data,
                env : process.env.NODE_ENV
            });
        });
    }
};

module.exports = controllers;
