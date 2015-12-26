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
exports.getAllPrograms = (req, res, next) => {
    var criteria = {
        count: req.query.count || 24,
        page: req.query.page || 1,
        status: req.query.status || 'publish'
    };

    program.getAllPrograms(criteria, (err, data) => {
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
 * Return a specific program.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getProgramBySlug = (req, res, next) => {
    var slug = req.params.slug;

    program.getProgramBySlug(slug, (err, data) => {
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
 * Return the weekly programs schedule.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getProgramsSchedule = (req, res, next) => {
    program.getProgramsSchedule((err, data) => {
        if (err) return next(err);

        try {
            var parsed = JSON.parse(data);

            res.status(parsed.code).send(parsed);
        } catch(e) {
            return next(e);
        }
    });
};
