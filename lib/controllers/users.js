var UserDao = require('../daos/user.js');

/**
 * Return a user,
 * grabbed by its uuid.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {string}
 */
exports.getUserByUuid = function(req, res, next) {
    var uuid = req.param('uuid');
    var user = new UserDao();

    user.getUserByUuid(uuid, function(err, data) {
        if (err) return cb(err, null);

        res.send(JSON.parse(data));
    });
};
