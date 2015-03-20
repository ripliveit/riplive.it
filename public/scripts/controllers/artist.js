'use strict';

angular.module('riplive')

/**
 * Load the data about a single artist,
 * using it's unique slug.
 *
 * @param {Object} $scope
 * @param {Object} $routeParams
 * @param {Object} artistsService
 */
.controller('ArtistCtrl', function ArtistCtrl($scope, $routeParams, artistsService) {
    var slug = $routeParams.slug;

    artistsService.getArtist(slug, function(data) {
        $scope.artist = data.artist;
    });
});
