'use strict';

angular.module('riplive')

/**
 * Load all artists within a specific tag.
 * Artist data are divided by alphabetical letters.
 *
 * @param {Object} $scope
 * @param {Object} $routeParams
 * @param {Object} artistsService
 * @param {Object} generalService
 */
.controller('ArtistsTagCtrl', function ArtistsTagCtrl($scope, $routeParams, artistsService, generalService) {
    var slug = $routeParams.slug;
    var pages = 0;
    var params = {
        slug: slug,
        page: 1,
        divide: true
    };

    artistsService.getArtistsByTag(params, function(data) {
        pages = data.pages;
        $scope.title = 'Artists'
        $scope.subtitle = data.tag.name;
        $scope.artists = data.artists;
    });

    $scope.loading = true;

    $scope.loadData = function() {
        if (params['page'] >= pages) {
            $scope.loading = false;
            return false;
        }

        params['page'] += 1;

        artistsService.getArtistsByTag(params, function(data) {
            generalService.pushToLetters(data.artists, $scope.artists);
        });
    };
});
