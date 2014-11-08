var app = require('../../app');
var hasher = require('../services/hasher.js');
var broker = require('../services/memcached-broker.js');

/**
 * Search Data Access Object.
 * Implement method to perform search.
 * Use the Broker to retrieve and save data to / from memcached.
 */
function SearchDao() {

    /**
     * Perform a serch on remote Wordpress API.
     * Accept a criteria object with
     * this params:
     * {
     *     search  : search, // Term to search for.
     *     type    : type,   // Type of post to search for.
     *     count   : count   //  Number of items to retrieve.
     * }
     * 
     * @param  {Object} criteria 
     * @param  {Function} cb Filled with data from remote server,
     *                       with error otherwise.
     * @return {undefined}
     */
    this.getSearchResults = function(criteria, cb) {
        var uri = app.get('wp_uri') + '/get_search_results/';
            uri += typeof criteria.search !== 'undefined' ? '?search=' + criteria.search : '';
            uri += typeof criteria.type   !== 'undefined' ? '&post_type=' + criteria.type : '';
            uri += typeof criteria.count  !== 'undefined' ? '&count=' + criteria.count : '';

        var hash = hasher.getHash(uri);

        broker.setTime(600).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };
};

module.exports = SearchDao;
