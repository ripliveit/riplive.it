'use strict';

angular.module('riplive')

/**
 * Load all news about a single category.
 * Paginate the result, pushing the data into $scope.posts.
 * Load additional news when user scrolls down the page.
 *
 * @param {Object} $scope
 * @param {Object} $routeParams
 * @param {Object} newsService
 * @param {Object} generalService
 */
.controller('CategoriesCtrl', function CategoriesCtrl($scope, $routeParams, newsService, generalService) {
    var slug = $routeParams.slug;
    var current = 1;
    var pages = 0;
    var count = 25;

    $scope.loading = true;
    $scope.data = [];

    newsService.getNewsByCategory({
        slug: slug,
        page: current,
        count: count
    }, function(data) {
        pages = data.pages;

        $scope.title = 'News';
        $scope.subtitle = data.category.title

        $scope.data.push({
            first: data.posts.shift(),
            posts: data.posts
        });
    });

    $scope.loadData = function() {
        if (current >= pages) {
            $scope.loading = false;
            return false;
        }

        current += 1;

        newsService.getNewsByCategory({
            slug: slug,
            page: current,
            count: count
        }, function(data) {
            $scope.data.push({
                first: data.posts.shift(),
                posts: data.posts
            });
        });
    };
});
