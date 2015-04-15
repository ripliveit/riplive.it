'use strict';

angular.module('riplive')

/**
 * Display a single, specific podcast.
 *
 * @param {Object} $scope
 * @param {Object} $routeParams
 * @param {Object} podcastsService
 */
.controller('PodcastCtrl', function PodcastCtrl($scope, $routeParams, podcastsService) {
    var id = $routeParams.id;
    var programSlug = $routeParams.program_slug;

    podcastsService.getPodcast(programSlug, id, function(data) {
        $scope.podcast = data;
    });
});
