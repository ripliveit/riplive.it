'use strict';

angular.module('riplive')

/**
 * Load all authors 
 * through authorsService.
 * 
 * @param {Object} $scope        
 * @param {Object} authorsService 
 */
.controller('AuthorsCtrl', function AuthorsCtrl($scope, authorsService) {
    $scope.loading = true;

    authorsService.getAuthors(function(data) {
        $scope.loading = false;
        $scope.authors = data;
    });
});
