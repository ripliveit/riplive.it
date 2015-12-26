var config      = require('config');
var memcached   = require(__dirname + '/../services/memcached-client.js');
var HttpService = require(__dirname + '/../services/http-service.js');
var hasher      = require(__dirname + '/../services/hasher.js');
var Broker      = require(__dirname + '/../services/memcached-broker.js');
var ChartDao    = require('../daos/chart.js');

var broker      = new Broker(memcached, HttpService);
var chart       = new ChartDao(config, hasher, broker);

/**
 * Return all charts.
 *
 * @param  {Function} req
 * @param  {Function} res
 * @param  {Function} next
 * @return {undefined}
 */
exports.getAllCompleteCharts = (req, res, next) => {
    var page = req.query.page || 1;

    chart.getAllCompleteCharts(page, (err, data) => {
        if (err) return next(err);

        try {
            var parsed = JSON.parse(data);

            res.status(parsed.code).send(parsed);
        } catch(e) {
            return next(e);
        }
    });
};

/**
 * Return a specific charts,
 * with all related songs.
 *
 * @param  {Function} req
 * @param  {Function} res
 * @param  {Function} next
 * @return {undefined}
 */
exports.getAllCompleteChartsByChartType = (req, res, next) => {
    var slug = req.params.slug;

    chart.getAllCompleteChartsByChartType(slug, (err, data) => {
        if (err) return next(err);

        try {
            var parsed = JSON.parse(data);

            res.status(parsed.code).send(parsed);
        } catch(e) {
            return next(e);
        }
    });
};

/**
 * Return last complete charts, 
 * one per type.
 *
 * @param  {Function} req
 * @param  {Function} res
 * @param  {Function} next
 * @return {undefined}
 */
exports.getLatestCompleteCharts = (req, res, next) => {
    chart.getLatestCompleteCharts((err, data) => {
        if (err) return next(err);

        try {
            var parsed = JSON.parse(data);

            res.status(parsed.code).send(parsed);
        } catch(e) {
            return next(e);
        }
    });
};

/**
 * Return a specific complete charts (with all related songs)
 * retrieved by its unique slug.
 *
 * @param  {Function} req
 * @param  {Function} res
 * @param  {Function} next
 * @return {undefined}
 */
exports.getCompleteChartBySlug = (req, res, next) => {
    var slug = req.params.slug;

    chart.getCompleteChartBySlug(slug, (err, data) => {
        if (err) return next(err);

        try {
            var parsed = JSON.parse(data);

            res.status(parsed.code).send(parsed);
        } catch(e) {
            return next(e);
        }
    });
};

/**
 * Insert a chart vote.
 *
 * @param  {Function} req
 * @param  {Function} res
 * @param  {Function} next
 * @return {undefined}
 */
exports.insertCompleteChartVote = (req, res, next) => {
    var data = req.body;

    chart.insertCompleteChartVote(data, (err, data) => {
        if (err) return next(err);

        try {
            var parsed = JSON.parse(data);

            res.status(parsed.code).send(parsed);
        } catch(e) {
            return next(e);
        }
    });
};
