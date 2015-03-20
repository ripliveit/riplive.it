'use strict';

angular.module('riplive')

/**
 * Load all news with a specific tag.
 * Paginate the result, pushing the data into $scope.posts.
 * Load additional news when user scrolls down the page.
 *
 * @param {Object} $scope         
 * @param {Object} $routeParams   
 * @param {Object} newsService   
 * @param {Object} generalService
 */
.controller('TagsCtrl', function TagsCtrl($scope, $routeParams, newsService, generalService) {
    var slug = $routeParams.slug;
    var current = 1;
    var pages = 0;

    newsService.getNewsByTag({
        slug: slug
    }, function(data) {
        pages = data.pages;

        $scope.title = 'News';
        $scope.subtitle = data.tag.title;
        $scope.posts = data.posts;
    });

    $scope.loading = true;

    $scope.loadData = function() {
        if (current >= pages) {
            $scope.loading = false;
            return false;
        }

        current += 1;

        var params = {
            slug: slug,
            page: current
        };

        newsService.getNewsByTag(params, function(data) {
            generalService.pushToArray(data.posts, $scope.posts);
        });
    };
});
