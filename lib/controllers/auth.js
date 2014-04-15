var auth = require('../services/auth.js');

/**
 * Handle the Facebook
 * authentication through auth service.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {string}
 */
exports.authFacebook = function(req, res, next) {
    auth.authenticate('facebook', {
        scope: 'email'
    }, function(err, user, info) {
        if (err) {
            return next(err);
        }
    })(req, res, next);
};


/**
 * Success action.
 * Redirect to the client side login route, setting the user's uuid for the client.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {string}
 */
exports.success = function(req, res, next) {
    var uuid = req.user.uuid;
    res.redirect('/login?uuid=' + uuid);
};


/**
 * Redirect to the client side error page.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {string}
 */
exports.failure = function(req, res, next) {
    res.redirect('/error');
};
