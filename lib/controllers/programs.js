var ProgramDao = require('../daos/program.js');


/**
 * Return a list of programs.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {string}
 */
exports.getAllPrograms = function(req, res, next) {
    var count = req.query.count || 24;
    var page = req.query.page || 1;
    var podcasts = req.query.podcasts;
    var program = new ProgramDao();

    program.getAllPrograms(count, page, podcasts, function(err, data) {
        if (err) {
            return next(err);
        }

        res.send(JSON.parse(data));
    });
};


/**
 * Return a specific program.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {string}
 */
exports.getProgramBySlug = function(req, res, next) {
    var slug = req.param('slug');
    var program = new ProgramDao();

    program.getProgramBySlug(slug, function(err, data) {
        if (err) {
            return next(err);
        }

        res.send(JSON.parse(data));
    });
};

/**
 * Return the weekly programs schedule.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {string}
 */
exports.getProgramsSchedule = function(req, res, next) {
    var program = new ProgramDao();

    program.getProgramsSchedule(function(err, data) {
        if (err) {
            return next(err);
        }

        res.send(JSON.parse(data));
    });
};
