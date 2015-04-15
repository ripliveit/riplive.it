'use strict';

angular.module('riplive')

/**
 * Load the data about a single authors,
 * using it's unique slug.
 * 
 * @param {Object} $scope        
 * @param {Object} $routeParams   
 * @param {Object} authorsService 
 */
.controller('AuthorCtrl', function AuthorCtrl($scope, $routeParams, authorsService) {
    var slug = $routeParams.slug;

    authorsService.getAuthor(slug, function(data) {
        $scope.author = data;
    });
});
