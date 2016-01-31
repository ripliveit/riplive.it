var util = require('util')
var BaseDao = require(__dirname + '/base-dao.js');

/**
 * Highlight Data Access Object.
 * Implement method to retrieve and manipulate Highlight Object.
 * Use the Broker to retrieve and save data to / from memcached.
 */
function HighlightDao(config, hasher, broker) {

    BaseDao.call(this, config, hasher, broker);
    
    /**
     * Return all site highlights.
     * Accept a criteria object with
     * this params:
     * {
     *     count  : count,
     *     page   : page
     * }
     *
     * @param  {Int}   count Number of items to retrieve.
     * @param  {Int}   page  Number of page.
     * @param  {Function} cb Fired with data from remote server,
     *                       with error otherwise.
     * @return {undefined}
     */
    this.getHighlights = function(criteria, cb) {
        var uri = this.getAdminUri();
            uri += '?action=rip_highlights_get_all_highlights'
            uri += '&page='  + criteria.page;
            uri += '&count=' + criteria.count;

        var hash = this.hasher.getHash(uri);

        this.broker.setTime(120).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };
};

// Inherits
// from BaseDao
util.inherits(HighlightDao, BaseDao);

module.exports = HighlightDao;
