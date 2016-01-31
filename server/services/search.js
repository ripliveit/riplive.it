var util = require('util')
var BaseDao = require(__dirname + '/base-dao.js');

/**
 * Search Data Access Object.
 * Implement method to perform search.
 * Use the Broker to retrieve and save data to / from memcached.
 */
function SearchDao(config, hasher, broker) {

    BaseDao.call(this, config, hasher, broker);
    
    /**
     * Perform a serch on remote Wordpress API.
     * Accept a criteria object with
     * this params:
     * {
     *     search  : search, // Term to search for.
     *     type    : type,   // Type of post to search for.
     *     count   : count   // Number of items to retrieve.
     *     page    : page    // Page number.
     * }
     * 
     * @param  {Object} criteria 
     * @param  {Function} cb Filled with data from remote server,
     *                       with error otherwise.
     * @return {undefined}
     */
    this.getSearchResults = function(criteria, cb) {
        var uri = this.getWpUri();
            uri += '/get_search_results/';
            uri += typeof criteria.search !== 'undefined' ? '?search=' + criteria.search : '';
            uri += typeof criteria.type   !== 'undefined' ? '&post_type=' + criteria.type : '';
            uri += typeof criteria.count  !== 'undefined' ? '&count=' + criteria.count : '';
            uri += typeof criteria.count  !== 'undefined' ? '&page=' + criteria.page : '';

        var hash = this.hasher.getHash(uri);

        this.broker.setTime(600).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };
};

// Inherits
// from BaseDao
util.inherits(SearchDao, BaseDao);

module.exports = SearchDao;
