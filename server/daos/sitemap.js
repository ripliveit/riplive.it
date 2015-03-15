var util = require('util')
var BaseDao = require(__dirname + '/base-dao.js');

/**
 * Sitemap Data Access Object.
 * Return the xml sitemap from the remote server.
 */
function SiteMapDao() {

    BaseDao.call(this);

    /**
     * Return the xml sitemap representation.
     * 
     * @param  {Function} cb   Fired with data from remote server,
     *                         with error otherwise.
     * @return {undefined}
     */
    this.getSiteMap = function(cb) {
        var uri = this.getAdminUri();
            uri += '?action=rip_seo_get_sitemap';

        var hash = this.hasher.getHash(uri);
        
        this.broker.setTime(600).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };
};

// Inherits
// from BaseDao
util.inherits(SiteMapDao, BaseDao);

module.exports = SiteMapDao;
