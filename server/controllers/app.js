// var SeoDao = require('../daos/seo.js');
// var seoDao = new SeoDao();

/**
 * 
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.render = function(req, res, next) {
    // var index = app.get('staticFolder') + '/index.html';
    // res.sendfile(index);
    // 
    console.log(req);
    res.render('index', {
        a: 1
    });

    // seoDao.getMetaByPath(function(err, data) {
    //     if (err) return next(err);

    //     res.header('Content-Type', 'text/xml').send(data);
    // });
};
