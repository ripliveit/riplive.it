var app = require('../../app');
var hasher = require('../services/hasher.js');
var broker = require('../services/memcached-broker.js');

/**
 * Highlight Data Access Object.
 * Implement method to retrieve and manipulate Highlight Object.
 * Use the Broker to retrieve and save data to / from memcached.
 */
var HighlightDao = function() {

    /**
     * Return all site highlights.
     *
     * @param  {Int}   count Number of items to retrieve.
     * @param  {Int}   page  Number of page.
     * @param  {Function} cb Fired with data from remote server,
     *                       with error otherwise.
     * @return {undefined}
     */
    this.getHighlights = function(count, page, cb) {
        var uri = app.get('admin_uri') + '?action=rip_highlights_get_all_highlights&page=' + page;
            uri += '&count=' + count;
        var hash = hasher.getHash(uri);

        broker.setTime(120).get(hash, uri, function(err, data) {
            if (err) {
                return cb(err, null);
            }

            cb(null, data);
        });
    };
};

module.exports = HighlightDao;
