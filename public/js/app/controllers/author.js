'use strict';

angular.module('riplive')

/**
 * Load the data about a single authors,
 * using it's unique slug.
 * 
 * @param {Object} $scope        
 * @param {Object} $routeParams   
 * @param {Object} authorsService 
 * @param {Object} newsService
 */
.controller('AuthorCtrl', function AuthorCtrl($scope, $routeParams, authorsService, newsService) {
    var slug = $routeParams.slug;
    var current = 1;
    var pages   = 0;
    var count   = 24;

    authorsService.getAuthor(slug, function(data) {
        $scope.author = data;
    });

    newsService.getNews({
        author: slug,
        page: current,
        count : count
    }, function(data) {
        pages = data.pages;
        $scope.posts = data.posts;
    });

    /**
     * Load data only when user scroll 
     * to the bottom of the page.
     * 
     * @return {undefined}
     */
    $scope.loadData = function() {
        if (current >= pages) {
            $scope.loading = false;
            return false;
        }

        current += 1;

        newsService.getNews({
            author: slug,
            page: current,
            count : count
        }, function(data) {
            data.posts.forEach(function(post) {
                $scope.posts.push(post);
            });
        });
    };
});
