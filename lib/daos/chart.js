var util = require('util')
var BaseDao = require(__dirname + '/base-dao.js');
var HttpService = require('../services/http-service.js');

/**
 * Chart Data Access Object.
 * Implement method to retrieve and manipulate Chart Object.
 * Use the Broker to retrieve and save data to / from memcached.
 */
function ChartDao() {
    
    BaseDao.call(this);

    /**
     * Return all complete charts.
     * Accept a criteria object with
     * this params:
     * {
     *     count  : count,
     *     page   : page
     * }
     * 
     * @param  {Object} criteria Number of items to retrieve.
     * @param  {Function} cb     Fired with data from remote server,
     *                           with error otherwise.
     * @return {undefined}
     */
    this.getAllCompleteCharts = function(criteria, cb) {
        var uri = this.getAdminUri();
            uri += '?action=rip_charts_get_all_complete_charts';

        var hash = this.hasher.getHash(uri);

        this.broker.setTime(120).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };

    /**
     * Return all complete charts
     * of a specific type (hip-hop, electronic etc.)
     *
     * @param  {String}   slug The chart's type slug.
     * @param  {Function} cb   Filled with data from remote server,
     *                         with error otherwise.
     * @return {undefined}
     */
    this.getAllCompleteChartsByChartSlug = function(slug, cb) {
        var uri = this.getAdminUri(); 
            uri += '?action=rip_charts_get_all_complete_charts_by_chart_slug';
            uri += '&slug=' + slug;

        var hash = this.hasher.getHash(uri);
        
        this.broker.setTime(10).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };

    /**
     * Return a single chart.
     *
     * @param  {String}   slug Chart's slug.
     * @param  {Function} cb   Filled with data from remote server,
     *                         with error otherwise.
     * @return {undefined}
     */
    this.getCompleteChartBySlug = function(slug, cb) {
        var uri = this.getAdminUri();
            uri += '?action=rip_charts_get_complete_chart_by_chart_archive_slug' 
            uri += '&slug=' + slug;

        var hash = this.hasher.getHash(uri);

        this.broker.setTime(10).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };

    /**
     * Persists a user's vote to the
     * Wordpress remote storage.
     *
     * @param  {Object}   data Vote data to persists.
     * @param  {Function} cb   Filled with data from remote server,
     *                         with error otherwise.
     * @return {undefined}
     */
    this.insertCompleteChartVote = function(data, cb) {
        var uri = this.getAdminUri();
            uri += '?action=rip_charts_insert_complete_chart_vote';

        HttpService.post(uri, data, function(err, response, body) {
            if (err) return cb(err, null);

            if (response.statusCode !== 200) {
                var err = new Error('Error in remote server. Status code: ' + response.statusCode);
                return cb(err, null);
            }

            return cb(null, body);
        });
    };
};

// Inherits
// from BaseDao
util.inherits(ChartDao, BaseDao);

module.exports = ChartDao;
