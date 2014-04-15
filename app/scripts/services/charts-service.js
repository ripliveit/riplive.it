'use strict';

angular.module('riplive')

/**
 * A service that implements methods
 * to query and manipulate Chart resource.
 * Has $injector as dependency, using it to retrieve the desired
 * resource.
 *
 * @param  {Object} $injector
 * @return {Object}
 */
.service('chartsService', function chartsService($injector) {
    var Chart = $injector.get('chart');

    return {

        /**
         * Return a single chart.
         *
         * @param  {String}   slug The chart's unique slug.
         * @param  {Function} cb Fired when date are retrieved from the server.
         * @return {undefined}
         */
        getChart: function(slug, cb) {
            var chart = Chart.get({
                slug: slug
            });

            chart.$promise.then(function(data) {
                cb(data);
            });
        },

        /**
         * Return all charts.
         *
         * @param  {Function} cb Fired when date are retrieved from the server.
         * @return {undefined}
         */
        getCharts: function(cb) {
            var charts = Chart.list();

            charts.$promise.then(function(data) {
                cb(data);
            });
        }
    };
});
