'use strict';

angular.module('riplive')

/**
 * Retrieve and display single program.
 *
 * @param {Object} $scope
 * @param {Object} $routeParams
 * @param {Object} programsService
 */
.controller('ProgramCtrl', function ProgramCtrl($scope, $routeParams, programsService) {
    var slug = $routeParams.slug;

    programsService.getProgram(slug, function(data) {
        $scope.program = data.program;
    });
});
