'use strict';

angular.module('riplive')

/**
 * Load all artists 
 * through artistsService.
 * 
 * @param {Object} $scope        
 * @param {Object} artistsService 
 * @param {Object} generalService
 */
  .controller('ArtistsCtrl', function ArtistsCtrl($scope, artistsService, generalService) {
    var pages = 0;
    var params = {
        page: 1,
        divide: true
    };

    artistsService.getArtists(params, function(data) {
        pages = data.pages;
        $scope.title = 'Artists';
        $scope.artists = data.artists;
    });

    $scope.loading = true;

    $scope.loadData = function() {
        if (params['page'] >= pages) {
            $scope.loading = false;
            return false;
        }

        params['page'] += 1;

        artistsService.getArtists(params, function(data) {
            generalService.pushToLetters(data.artists, $scope.artists);
        });
    };
  });
