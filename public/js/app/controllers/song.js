'use strict';

angular.module('riplive')

/**
 * Load a specific song, by its unique slug.
 *
 * @param {Object} $scope      
 * @param {Object} $routeParams 
 * @param {Object} songsService
 */
.controller('SongCtrl', function SongCtrl($scope, $routeParams, songsService) {
    var slug = $routeParams.slug;

    songsService.getSong(slug, function(data) {
        $scope.song = data.song;
    });
});
