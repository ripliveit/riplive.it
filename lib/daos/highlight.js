var app = require('../../app');
var hasher = require('../services/hasher.js');
var broker = require('../services/memcached-broker.js');

/**
 * Highlight Data Access Object.
 * Implement method to retrieve and manipulate Highlight Object.
 * Use the Broker to retrieve and save data to / from memcached.
 */
function HighlightDao() {

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
        var uri = app.get('admin_uri');
            uri += '?action=rip_highlights_get_all_highlights'
            uri += '&page='  + criteria.page;
            uri += '&count=' + criteria.count;

        var hash = hasher.getHash(uri);

        broker.setTime(120).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };
};

module.exports = HighlightDao;
