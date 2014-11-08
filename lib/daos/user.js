var app = require('../../app');
var hasher = require('../services/hasher.js');
var broker = require('../services/memcached-broker.js');

/**
 * User Data Access Object.
 * Implements method to retrieve and manipulate User Object.
 * Use the Broker to retrieve and save data to / from memcached.
 */
var UserDao = function() {

    /**
     * Retrieve a user by it's unique identifier.
     * 
     * @param  {String} uuid The user unique identifier.
     * @param  {Function} cb Fired with data from remote server,
     *                       with error otherwise.
     * @return {undefined}
     */
    this.getUserByUuid = function(uuid, cb) {
        var uri = app.get('admin_uri');
            uri += '?action=rip_social_users_get_social_user_by_uuid';
            uri += '&uuid=' + uuid;
            
        var hash = hasher.getHash(uri);

        broker.setTime(60).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };
};

module.exports = UserDao;
