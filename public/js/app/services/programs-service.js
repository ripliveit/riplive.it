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

    function convertToSeconds(hhMM) {
        var split = hhMM.split(':');
        var hour  = split[0];
        var minutes = split[1];
    }

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
         * Return a list of programs,
         * where the first is the next scheduled.
         *
         * @param  {Object}    params Used for pagination.
         * @param  {Function}  cb Fired when date are retrieved from the server.
         * @return {undefined}
         */
        getPrograms: function(params, cb) {
            var programs = Program.list(params);

            programs.$promise.then(function(data) {
                var first       = null;
                var now         = moment();
                var today       = now.format('dddd');
                var currentHour = now.format('HH:mm');

                for (var i = 0; i < data.programs.length; i++) {
                    var program     = data.programs[i];
                    var programDays = program.program_information['programs-days'];
                    var schedule    = program.program_information['programs-schedule'];
                    var parsed      = moment(schedule, 'HH:mm');

                    if (typeof programDays === 'undefined') {
                        continue;
                    }

                    for (var j = 0; j < programDays.length; j++) {
                        var programDay = programDays[j];

                        if (today === programDay) {
                            if (now.unix() > parsed.unix()) {
                                continue;
                            }

                            if (first === null) {
                                first = program;
                            } else {
                                var firstUnix   = moment(first.program_information['programs-schedule'], 'HH:mm').unix();
                                var programUnix = parsed.unix();

                                if (programUnix < firstUnix) {
                                    first = program;
                                }
                            }
                        }
                    }                    
                }

                data.programs.splice(data.programs.indexOf(first), 1);
                data.programs.unshift(first);

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
