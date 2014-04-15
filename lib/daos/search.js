var app = require('../../app');
var hasher = require('../services/hasher.js');
var broker = require('../services/memcached-broker.js');

/**
 * Search Data Access Object.
 * Implement method to perform search.
 * Use the Broker to retrieve and save data to / from memcached.
 */
var SongDao = function() {

    /**
     * Perform a serch on remote Wordpress API.
     * 
     * @param  {String} search Term to search for.
     * @param  {String}  type  Type of post to search for.
     * @param  {Int}   count   Number of items to retrieve.
     * @param  {Function} cb Fired with data from remote server,
     *                       with error otherwise.
     * @return {undefined}
     */
    this.getSearchResults = function(search, type, count, cb) {
        var uri = app.get('wp_uri') + '/get_search_results/?search='
            uri += typeof search !== 'undefined' ? search : '';
            uri += typeof type !== 'undefined' ? '&post_type=' + type : '';
            uri += typeof count !== 'undefined' ? '&count=' + count : '';

        var hash = hasher.getHash(uri);

        broker.setTime(600).get(hash, uri, function(err, data) {
            if (err) {
                return cb(err, null);
            }

            cb(null, data);
        });
    };
};

module.exports = SongDao;
