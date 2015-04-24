'use strict';

angular.module('riplive')

/**
 * Define a directive that handles the drawings
 * of the highlights section (the grid or the carousel).
 * Use PubSub channels to subscribe and react to others interface's components events,
 * like the open / close of the side menu or of the on air modal window.
 *
 * @param  {Object} $window
 * @param  {Object} $location
 * @param  {Object} onAirChannel
 * @return {undefined}
 */
.directive('topHighlights', function($window, $rootScope, $location, onAirChannel) {
    return {
        templateUrl: 'js/app/templates/top-highlights.html',
        replace: true,
        restrict: 'E'
    };
});
