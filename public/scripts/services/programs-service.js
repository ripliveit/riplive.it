'use strict';

angular.module('riplive')

/**
 * A service that implements methods
 * to query and manipulate Program resource.
 * Has $injector as dependency, using it to retrieve the desired
 * resource.
 *
 * @param  {Object} $injector
 * @return {Object}
 */
.service('programsService', function programsService($injector) {
    var Program = $injector.get('program');
    var Schedule = $injector.get('schedule');

    return {

        /**
         * Return a single program.
         *
         * @param  {String}   slug Program's slug.
         * @param  {Function} cb Fired when date are retrieved from the server.
         * @return {undefined}
         */
        getProgram: function(slug, cb) {
            var program = Program.get({
                slug: slug
            });

            program.$promise.then(function(data) {
                cb(data);
            });
        },

        /**
         * Returna list of programs.
         *
         * @param  {Object}    params Used for pagination.
         * @param  {Function}  cb Fired when date are retrieved from the server.
         * @return {undefined}
         */
        getPrograms: function(params, cb) {
            var programs = Program.list(params);

            programs.$promise.then(function(data) {
                cb(data);
            });
        },

        /**
         * Return the programs schedule.
         *
         * @param  {Function} cb Fired when date are retrieved from the server.
         * @return {undefined}
         */
        getSchedule: function(cb) {
            var schedule = Schedule.list();

            schedule.$promise.then(function(data) {
                cb(data);
            });
        }
    };
});
