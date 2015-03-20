'use strict';

angular.module('riplive')

/**
 * Make a request and rendere results
 * from remote search endpoint.
 *
 * @param {Object} $scope
 * @param {Object} $routeParams
 * @param {Object} searchService
 * @param {Object} generalService
 */
.controller('SearchCtrl', function SearchCtrl($scope, $routeParams, searchService, generalService) {
    var search = $routeParams.search;
    var pages = 0;
    var params = {
        search: search,
        page: 1
    };
    var message = 'You\'ve searched for: ' + search;

    if (!search) {
        return false;
    }

    // Get search 
    // results from service.
    searchService.getSearchResults(params, function(data) {
        pages = data.pages;
        $scope.loading = false;
        $scope.posts = data.posts;

        if (data.posts.length === 0) {
            message = 'No results for: ' + search;
        }
        $scope.countTotal =  data.count_total;
        $scope.subtitle = message;
    });

    $scope.loading = true;

    // Load data and push
    // to $scope.posts array
    // when user reach the bottom of the window.
    $scope.loadData = function() {
        if (params['page'] >= pages) {
            $scope.loading = false;
            return false;
        }

        params['page'] += 1;

        searchService.getSearchResults(params, function(data) {
            generalService.pushToArray(data.posts, $scope.posts);
        });
    };
});
