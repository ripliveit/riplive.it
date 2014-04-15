'use strict';

angular.module('riplive')

/**
 * Retrieve and display a specific news (by it's slug) and
 * the inherent author's data.
 *
 * @param {Object} $scope         [description]
 * @param {Object} $routeParams   [description]
 * @param {Object} newsService    [description]
 * @param {Object} authorsService [description]
 */
.controller('NewsCtrl', function NewsCtrl($scope, $routeParams, newsService, authorsService) {
    var slug = $routeParams.slug;

    newsService.getNewsBySlug(slug, function(data) {
        // Wordpress treats previous posts as the oldest.
        var next = data.previous_url ? data.previous_url.split('/') : false;
        var prev = data.next_url ? data.next_url.split('/') : false;

        $scope.news = data.post;
        $scope.news['previous_slug'] = prev[3];
        $scope.news['next_slug'] = next[3];
        authorsService.getAuthor(data.post.author.slug, function(data) {
            $scope.author = data;
        });
    });
});
