'use strict';

angular.module('riplive')

/**
 * Load all songs of a specific genre.
 * Songs data are divided by alphabetical letters.
 * 
 * @param {Object} $scope
 * @param {Object} $routeParams
 * @param {Object} songsService
 * @param {Object} genresService
 * @param {Object} generalService
 */
.controller('SongsGenreCtrl', function SongsGenreCtrl($scope, $routeParams, $location, songsService, genresService, generalService) {
    var slug = $routeParams.slug;
    var pages = 0;
    var params = {
        slug: slug,
        page: 1,
        divide: true
    };

    genresService.getSongsGenres(function(data) {
        $scope.songsGenres = data.genres;
    });

    songsService.getSongsByGenre(params, function(data) {
        pages = data.pages;
        $scope.title = 'Songs';
        $scope.subtitle = data.genre.name;
        $scope.songs = data.songs;
    });

    $scope.loading = true;

    $scope.$watch('currentGenre', function(newValue, oldValue) {
        if (newValue) {
            $location.path('/songs/genre/' + newValue.slug);
        }
    });

    $scope.loadData = function() {
        if (params['page'] >= pages) {
            $scope.loading = false;
            return false;
        }

        params['page'] += 1;

        songsService.getSongsByGenre(params, function(data) {
            generalService.pushToLetters(data.songs, $scope.songs);
        });
    };
});
