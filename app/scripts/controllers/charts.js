'use strict';

angular.module('riplive')

/**
 * Load and display all charts.
 *
 * @param {Object} $scope
 * @param {Object} chartsService
 */
.controller('ChartsCtrl', function ChartsCtrl($scope, chartsService) {
    $scope.loading = true;    
    
    chartsService.getCharts(function(data) {
        $scope.loading = false;
        $scope.charts = data.complete_charts;
    });
});
