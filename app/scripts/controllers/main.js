'use strict';

angular.module('riplive')

/**
 * Handle application's home page.
 * Retrieve last news and podcasts.
 * News are lazy loaded with infinite scrolling.
 * 
 * @param {Object} $scope        
 * @param {Object} newsService   
 * @param {Object} generalService
 */
.controller('MainCtrl', function MainCtrl($scope, newsService, podcastsService, generalService) {
    var current = 1;
    var pages = 0;
    $scope.loading = true;

    podcastsService.getPodcasts({
        count : 4
    }, function(data) {
        $scope.podcasts = data.podcasts;
    });

    newsService.getNews({
        page: current,
        count : 26
    }, function(data) {
        pages = data.pages;
        $scope.firsts = data.posts.splice(0, 2);
        $scope.posts = data.posts;
    });

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
