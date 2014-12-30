var util = require('util')
var BaseDao = require(__dirname + '/base-dao.js');

/**
 * User Data Access Object.
 * Implements method to retrieve and manipulate User Object.
 * Use the Broker to retrieve and save data to / from memcached.
 */
var UserDao = function() {

    BaseDao.call(this);
    
    /**
     * Retrieve a user by it's unique identifier.
     * 
     * @param  {String} uuid The user unique identifier.
     * @param  {Function} cb Fired with data from remote server,
     *                       with error otherwise.
     * @return {undefined}
     */
    this.getUserByUuid = function(uuid, cb) {
        var uri = this.getAdminUri();
            uri += '?action=rip_social_users_get_social_user_by_uuid';
            uri += '&uuid=' + uuid;
            
        var hash = this.hasher.getHash(uri);

        this.broker.setTime(60).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };
};

// Inherits
// from BaseDao
util.inherits(UserDao, BaseDao);

module.exports = UserDao;
