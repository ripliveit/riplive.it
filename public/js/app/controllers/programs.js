'use strict';

angular.module('riplive')

/**
 * Load all application's programs.
 *
 * @param {Object} $scope
 * @param {Object} programsService
 */
.controller('ProgramsCtrl', function ProgramsCtrl($scope, programsService) {
    $scope.loading = true;

    programsService.getPrograms({}, function(data) {
        $scope.loading   = false;
        $scope.scheduled = data.programs.shift();
        $scope.programs  = data.programs;
    });
});
