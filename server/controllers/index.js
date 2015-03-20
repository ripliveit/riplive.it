var fs = require('fs');
var files = fs.readdirSync(__dirname);
var controllers = {};
var SeoDao = require('../daos/seo.js');
var seoDao = new SeoDao();

/**
 * Dinamically load all controllers,
 * and exports them as an object.
 *
 * @param  {object} file
 * @return {undefined}
 */
files.forEach(function(file) {
    if (file !== 'index.js') {
        controllers[file.slice(0, -3)] = require(__dirname + '/' + file);
    }
});

/**
 * Define the index controller.
 * @type {Object}
 */
controllers.index = {
    render : function(req, res, next) {
        seoDao.getMetaByPath(req.url, function(err, data) {
            if (err) return next();

            res.render('index', {
                meta: data,
                env : process.env.NODE_ENV
            });
        });
    }
};

module.exports = controllers;