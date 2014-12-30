var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var userService = require('./user.js');

/**
 * Serialize the user's data into the application's session.
 *
 * @param  {Object}   user [description]
 * @param  {Function} done [description]
 * @return {undefined}
 */
passport.serializeUser(function(user, done) {
    done(null, user);
});

/**
 * Deserialize the user's data from the application's session.
 *
 * @param  {Object}   user
 * @param  {Function} done
 * @return {undefined}
 */
passport.deserializeUser(function(user, done) {
    done(null, user);
});

/**
 * Configure Facebook Login strategy.
 *
 * @param  {string}   accessToken  Facebook Access Token.
 * @param  {string}   refreshToken Facebook Refresh Token.
 * @param  {Object}   profile      Facebook user's profile.
 * @param  {Function} done         A callback fired when all work are done.
 * @return {undefined}
 */
passport.use(new FacebookStrategy({
        clientID: '1380026972276511',
        clientSecret: '45e7dcdfc8965940fa6b0cc2833d257b',
        callbackURL: 'http://www.riplive.it/api/auth/facebook/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        var data = {
            accessToken: accessToken,
            refreshToken: refreshToken,
            profile: profile
        };

        // Try 
        // to find the user by it's email.
        userService.find(profile.emails[0]['value'], function(err, res) {
            if (err) {
                throw new Error(err);
            }

            var parsed = JSON.parse(res);

            if (parsed.status === 'ok') {
                
                // Set the uuid 
                // and return user's data.
                data.uuid = parsed.user.uuid;
                return done(null, data);
            }

            // If 
            // no user can be retrieved
            // than try to persists a new one. When done set the user's
            // uuid to the current req.user
            userService.persists('facebook', profile, function(err, res) {
                if (err) {
                    throw new Error(err);
                }

                var parsed = JSON.parse(res);
                data.uuid = parsed.uuid;
                done(null, data);
            });
        });
    }
));

module.exports = passport;