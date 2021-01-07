'use strict';

angular.module('riplive')

/**
 * Highlights Controller.
 * Load last six highlights from the server through highlightsService.
 *
 * @param  {Object} $scope
 * @param  {Object} highlightsService
 */
.controller('HighlightsCtrl', function HighlightsCtrl($scope, highlightsService) {
    $scope.highlights = [];
    
    highlightsService.getHighlights(function(data) {
        $scope.highlights = data.highlights;
    });
});
