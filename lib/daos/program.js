var util = require('util')
var BaseDao = require(__dirname + '/base-dao.js');

/**
 * Program Data Access Object.
 * Implement method to retrieve and manipulate Program Object.
 * Use the Broker to retrieve and save data to / from memcached.
 */
function ProgramDao() {

    BaseDao.call(this);
    
    /**
     * Return a specific program.
     *
     * @param  {String} slug Program's slug.
     * @param  {Function} cb Fired with data from remote server,
     *                       with error otherwise.
     * @return {undefined}
     */
    this.getProgramBySlug = function(slug, cb) {
        var uri = this.getAdminUri();
            uri += '?action=rip_programs_get_program_by_slug';
            uri += '&slug=' + slug;

        var hash = this.hasher.getHash(uri);

        this.broker.setTime(600).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };

    /**
     * Return all programs.
     * Accept a criteria object with
     * this params:
     * {
     *     count  : count,
     *     page   : page
     * }
     *
     * @param  {Object} criteria 
     * @param  {Function} cb Filled with data from remote server,
     *                       with error otherwise.
     * @return {undefined}
     */
    this.getAllPrograms = function(criteria, cb) {
        var uri = this.getAdminUri();
            uri += '?action=rip_programs_get_all_programs';
            uri += '&count=' + criteria.count;
            uri += '&page='  + criteria.page;

        var hash = this.hasher.getHash(uri);

        this.broker.setTime(600).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };

    /**
     * Return all programs that are no more published
     * but that has an archive of podcasts.
     * Accept a criteria object with
     * this params:
     * {
     *     count  : count,
     *     page   : page
     * }
     * 
     * @param  {Object} criteria 
     * @param  {Function} cb Filled with data from remote server,
     *                       with error otherwise.
     * @return {undefined}
     */
    this.getAllProgramsForPodcast = function(criteria, cb) {
        var uri = this.getAdminUri();
            uri += '?action=rip_programs_get_all_programs_for_podcasts';
            uri += '&count=' + criteria.count;
            uri += '&page='  + criteria.page;

        var hash = this.hasher.getHash(uri);

        this.broker.setTime(600).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    };

    /**
     * Return the programs schedule.
     *
     * @param  {Function} cb Fired with data from remote server,
     *                       with error otherwise.
     * @return {undefined}
     */
    this.getProgramsSchedule = function(cb) {
        var uri = this.getAdminUri();
            uri += '?action=rip_programs_get_programs_schedule';

        var hash = this.hasher.getHash(uri);

        this.broker.setTime(600).get(hash, uri, function(err, data) {
            if (err) return cb(err, null);

            cb(null, data);
        });
    }
};

// Inherits
// from BaseDao
util.inherits(ProgramDao, BaseDao);

module.exports = ProgramDao;
