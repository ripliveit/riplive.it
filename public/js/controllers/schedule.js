'use strict';

angular.module('riplive')

/**
 * Load and display programs schedule.
 * 
 * @param {Object} $scope
 * @param {Object} programsService
 */
.controller('ScheduleCtrl', function ScheduleCtrl($scope, programsService) {
    $scope.loading = true;

    programsService.getSchedule(function(data) {
        $scope.loading  = false;
        $scope.schedule = data;
    });
});
