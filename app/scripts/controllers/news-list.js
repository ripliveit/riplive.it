'use strict';

angular.module('riplive')

/**
 * Retrieve and display application's news.
 * News are lazy loaded on user scroll.
 * 
 * @param {Object} $scope         
 * @param {Object} newsService
 * @param {Object} generalService
 */
.controller('NewsListCtrl', function NewsListCtrl($scope, newsService, generalService) {
    var current = 1;
    var pages = 0;

    /**
     * Load all news
     *                   
     * @return {undefined}
     */
    newsService.getNews({
        page: current,
        count : 26
    }, function(data) {
        pages = data.pages;

        $scope.title = 'News';
        $scope.subtitle = '';
        $scope.firsts = data.posts.splice(0, 2);
        $scope.posts = data.posts;
    });

    $scope.loading = true;

    /**
     * Load only when user scroll 
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
            page: current
        }, function(data) {
            generalService.pushToArray(data.posts, $scope.posts);
        });
    };
});
