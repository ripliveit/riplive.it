var ChartDao = require('../daos/chart.js');

/**
 * Return all charts.
 *
 * @param  {Function} req
 * @param  {Function} res
 * @param  {Function} next
 * @return {string}
 */
exports.getAllCompleteCharts = function(req, res, next) {
    var page = req.query.page || 1;
    var chart = new ChartDao();

    chart.getAllCompleteCharts(page, function(err, data) {
        if (err) {
            return next(err);
        }

        res.send(JSON.parse(data));
    });
};

/**
 * Return a specific charts,
 * with all related songs.
 *
 * @param  {Function} req
 * @param  {Function} res
 * @param  {Function} next
 * @return {string}
 */
exports.getAllCompleteChartsByChartSlug = function(req, res, next) {
    var slug = req.param('slug');
    var chart = new ChartDao();

    chart.getAllCompleteChartsByChartSlug(slug, function(err, data) {
        if (err) {
            return next(err);
        }

        res.send(JSON.parse(data));
    });
};

/**
 * Return a specific complete charts (with all related songs)
 * retrieved by its unique slug.
 *
 * @param  {Function} req
 * @param  {Function} res
 * @param  {Function} next
 * @return {string}
 */
exports.getCompleteChartBySlug = function(req, res, next) {
    var slug = req.param('slug');
    var chart = new ChartDao();

    chart.getCompleteChartBySlug(slug, function(err, data) {
        if (err) {
            return next(err);
        }

        res.send(JSON.parse(data));
    });
};

/**
 * Insert a chart vote.
 *
 * @param  {Function} req
 * @param  {Function} res
 * @param  {Function} next
 * @return {string}
 */
exports.insertCompleteChartVote = function(req, res, next) {
    var chart = new ChartDao();
    var data = req.body;
    
    chart.insertCompleteChartVote(data, function(err, data) {
        if (err) {
            return next(err);
        }

        res.send(JSON.parse(data));
    });
};
