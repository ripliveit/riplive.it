var app = require('../../app');
var uuid = require('node-uuid');
var httpService = require('./http-service.js');

/**
 * All accepted social providers.
 * 
 * @type {Array}
 */
var providers = ['facebook'];

/**
 * Remote uri used to retrieve a user by it's unique email;
 * 
 * @type {string}
 */
var userByEmailUri = app.get('admin_uri') + '?action=rip_social_users_get_social_user_by_email&email=';

/**
 * Remote uri used to insert a user to remote server storage.
 * 
 * @type {string}
 */
var postUserUri    = app.get('admin_uri') + '?action=rip_social_users_insert_social_user';

/**
 * Find a user by it's unique email.
 * Fire a callback when retrieving operation are done.
 * 
 * @param  {string}   email 
 * @param  {Function} cb    
 * @return {undefined}         
 */
exports.find = function(email, cb) {
    if (typeof email === 'undefined') {
        var err = new Error('Please specify a user email');
        return cb(err, null);
    }

    // Try to
    // retrieve the user by it's email.    
    httpService.get(userByEmailUri + email, function(err, res, body) {
        if (err) return cb(err, null);

        if (res.statusCode !== 200) {
            var err = new Error('Error in remote server');
            return cb(err, null);
        }

        cb(null, body);
    });
};

/**
 * Persists a user to the remote server storage.
 * Fire a callback when the remote server work is done.
 * 
 * @param  {string}   provider Identify the social network or provider from
 *                             which the user is coming.
 *                             
 * @param  {Object}   profile  User's profile
 * @param  {Function} cb       
 * @return {undefined}
 */
exports.persists = function(provider, profile, cb) {
    if (providers.indexOf(provider) === -1) {
        var err = new Error('Cannot find provider. ' + provider + ' was supplied');
        return cb(err, null);
    }

    if (typeof profile === 'undefined') {
        var err = new Error('Please specify a user profile');
        return cb(err, null);
    }

    // Prepare
    // the payload to be posted to the remote server.
    var payLoad = {
        user: {
            uuid : uuid.v1(),
            provider: provider,
            email: profile.emails[0]['value'],
            username: profile.username,
            display_name: profile.displayName,
            user_info: profile,
            registration_date: new Date()
        }
    };
   
    // Try
    // to http POST the user's data to the remote server.
    httpService.post(postUserUri, payLoad, function(err, res, body) {
        if (err) return cb(err, null);

        if (res.statusCode !== 200) {
            var err = new Error('Error in remote server');
            return cb(err, null);
        }

        cb(null, body);
    });
};