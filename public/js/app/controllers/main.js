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
    var count = 24;

    $scope.loading = true;
    $scope.data = [];

    podcastsService.getPodcasts({
        count : 3
    }, function(data) {
        $scope.podcasts = generalService.fillWithAdv(data.podcasts, 2);
    });

    newsService.getNews({
        page: current,
        count : count
    }, function(data) {
        pages = data.pages;

        $scope.data.push({
            first : data.posts.shift(),
            posts : generalService.fillWithAdv(data.posts, 5)
        });
    });

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
                posts : generalService.fillWithAdv(data.posts, 5)
            });
        });
    };
});
