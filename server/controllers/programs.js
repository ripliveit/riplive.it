var qs          = require('querystring');
var config      = require('config');
var memcached   = require(__dirname + '/../services/memcached-client.js');
var HttpService = require(__dirname + '/../services/http-service.js');
var hasher      = require(__dirname + '/../services/hasher.js');
var Broker      = require(__dirname + '/../services/memcached-broker.js');
var ProgramDao  = require('../daos/program.js');

var broker      = new Broker(memcached, HttpService);
var program     = new ProgramDao(config, hasher, broker);

/**
 * Return a list of programs.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getAllPrograms = function(req, res, next) {
    var criteria = {
        count: req.query.count || 24,
        page: req.query.page || 1,
        status: req.query.status || 'publish'
    };

    program.getAllPrograms(criteria, function(err, data) {
        if (err) return next(err);

        res.send(JSON.parse(data));
    });
};


/**
 * Return a specific program.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getProgramBySlug = function(req, res, next) {
    var slug = req.param('slug');

    program.getProgramBySlug(slug, function(err, data) {
        if (err) return next(err);

        res.send(JSON.parse(data));
    });
};

/**
 * Return the weekly programs schedule.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getProgramsSchedule = function(req, res, next) {
    program.getProgramsSchedule(function(err, data) {
        if (err) return next(err);

        res.send(JSON.parse(data));
    });
};
