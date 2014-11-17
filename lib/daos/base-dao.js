var config = require(__dirname + '/../configs/config.js');
var hasher = require(__dirname + '/../services/hasher.js');
var broker = require(__dirname + '/../services/memcached-broker.js');

function BaseDao() {
    this.wpUri = config.wp_uri;
    this.adminUri = config.admin_uri;

    this.hasher = hasher;
    this.broker = broker;
}

BaseDao.prototype.getAdminUri = function() {
    return this.adminUri;
};

BaseDao.prototype.getWpUri = function() {
    return this.wpUri;
};

module.exports = BaseDao;
