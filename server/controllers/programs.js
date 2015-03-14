﻿var ProgramDao = require('../daos/program.js');
var program = new ProgramDao();
var qs = require('querystring');

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
