'use strict';

angular.module('riplive')

/**
 * Load all artists within a specific genre.
 * Artist data are divided by alphabetical letters.
 *
 * @param {Object} $scope
 * @param {Object} $routeParams
 * @param {Object} artistsService
 * @param {Object} generalService
 */
.controller('ArtistsGenreCtrl', function ArtistsGenreCtrl($scope, $routeParams, artistsService, generalService) {
    var slug = $routeParams.slug;
    var pages = 0;
    var params = {
        slug: slug,
        page: 1,
        divide: true
    };

    artistsService.getArtistsByGenre(params, function(data) {
        pages = data.pages;
        $scope.title = 'Artists'
        $scope.subtitle = data.genre.name;
        $scope.artists = data.artists;
    });

    $scope.loading = true;

    $scope.loadData = function() {
        if (params['page'] >= pages) {
            $scope.loading = false;
            return false;
        }

        params['page'] += 1;

        artistsService.getArtistsByGenre(params, function(data) {
            generalService.pushToLetters(data.artists, $scope.artists);
        });
    };
});
