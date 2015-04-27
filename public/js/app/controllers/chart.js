'use strict';

angular.module('riplive')

/**
 * Load and display a single Chart.
 *
 * @param {Object} $scope
 * @param {Object} $routeParams
 * @param {Object} chartsService
 */
.controller('ChartCtrl', function ChartCtrl($scope, $routeParams, chartsService) {
    var slug = $routeParams.slug;

    $scope.loading = true;

    chartsService.getChart(slug, function(data) {
        $scope.loading = false;
        $scope.chart = data.complete_chart;

        var type = data.complete_chart.chart_slug;

        chartsService.getRelatedCharts(slug, type, function(data) {
            console.log(data);
            $scope.related = data;
        });
    });
});
