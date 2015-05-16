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
exports.getAllCompleteCharts = function(req, res, next) {
    var page = req.query.page || 1;

    chart.getAllCompleteCharts(page, function(err, data) {
        if (err) return next(err);

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
 * @return {undefined}
 */
exports.getAllCompleteChartsByChartType = function(req, res, next) {
    var slug = req.param('slug');

    chart.getAllCompleteChartsByChartType(slug, function(err, data) {
        if (err) return next(err);

        res.send(JSON.parse(data));
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
exports.getLatestCompleteCharts = function(req, res, next) {
    chart.getLatestCompleteCharts(function(err, data) {
        if (err) return next(err);

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
 * @return {undefined}
 */
exports.getCompleteChartBySlug = function(req, res, next) {
    var slug = req.param('slug');

    chart.getCompleteChartBySlug(slug, function(err, data) {
        if (err) return next(err);

        res.send(JSON.parse(data));
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
exports.insertCompleteChartVote = function(req, res, next) {
    var data = req.body;

    chart.insertCompleteChartVote(data, function(err, data) {
        if (err) return next(err);

        res.send(JSON.parse(data));
    });
};
