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
    var pages   = 0;
    var count   = 25;

    $scope.loading = true;
    $scope.data = [];

    /**
     * Load all news
     *                   
     * @return {undefined}
     */
    newsService.getNews({
        page: current,
        count : count
    }, function(data) {
        pages = data.pages;

        $scope.title = 'News';     

        $scope.data.push({
            first : data.posts.shift(),
            posts : data.posts
        });
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
            page: current,
            count : count
        }, function(data) {
            $scope.data.push({
                first : data.posts.shift(),
                posts : data.posts
            });
        });
    };
});
