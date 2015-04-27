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
         * @param  {Function} cb
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
         * @param  {Function} cb
         * @return {undefined}
         */
        getCharts: function(cb) {
            var charts = Chart.list();

            charts.$promise.then(function(data) {
                cb(data);
            });
        },

        /**
         * Return latest charts,
         * one per type.
         * 
         * @param  {Function} cb
         * @return {undefined}
         */
        getLatestCharts: function(cb) {
            var charts = Chart.latest();

            charts.$promise.then(function(data) {
                cb(data);
            });
        },

        /**
         * Return all related charts
         * of a specific type (e.g. electronic, hip hop)
         * Slug of the chart that start the relation must be specified to splice it
         * from the returned array.
         * 
         * @param  {String}   slug Chart's slug.
         * @param  {String}   type Chart's type.
         * @param  {Function} cb
         * @return {undefined}
         */
        getRelatedCharts: function(chartSlug, type, cb) {
            var charts = Chart.complete({
                slug: type
            });

            charts.$promise.then(function(data) {
                var related = [];

                if (data.code === 200) {
                    data.complete_charts.forEach(function(chart) {
                        // Remove the already 
                        // present chart.
                        if (chart.chart_archive_slug !== chartSlug) {
                            related.push(chart);
                        }
                    });
                }

                cb(related);
            });
        }
    };
});
