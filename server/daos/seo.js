var util = require('util');
var BaseDao = require(__dirname + '/base-dao.js');

/**
 * Seo Data Access Object.
 * 
 */
function SeoDao() {

    BaseDao.call(this);

    /**
     * Default metatag.
     * 
     * @type {Object}
     */
    this.defaultMeta = {
        title : '',
        path: '',
        description: 'Seguici con le news, i podcast, i programmi e le classifiche di Radio Illusioni Parallele. riplive.it - the next step',
        image : 'http://www.riplive.it/images/logo_medium.jpg',
        url : 'http://www.riplive.it'
    };

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

    /**
     * Return metatag,
     * give a specific path.
     * 
     * @param  {string}   path
     * @param  {Function} cb
     * @return {undefined}
     */
    this.getMetaByPath = function(path, cb) {
        var self = this;

        var uri = this.getAdminUri();
            uri += '?action=rip_seo_get_meta_by_path';
            uri += '&path=' + path;

        var hash = this.hasher.getHash(uri);
        
        this.broker.setTime(600).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            try {
                var parsed = JSON.parse(data);
            } catch(e) {
                return cb(e, null);
            }

            if (parsed.status === 'error') {
                data = self.defaultMeta;
            } else {
                data = parsed.meta;
            }

            cb(null, data);
        });
    };
};

// Inherits
// from BaseDao
util.inherits(SeoDao, BaseDao);

module.exports = SeoDao;
