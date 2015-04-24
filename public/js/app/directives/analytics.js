'use strict';

angular.module('riplive')

/**
 * Track pageviews with google analytics
 * on each route's change.
 *
 * @param  {object} $rootScope
 * @param  {object} $window
 * @param  {object} $location
 * @return {object}
 */
.directive('analytics', function($rootScope, $window, $location) {
    return {
        restrict: 'A',
        link: function postLink(scope, element, attrs) {
            var track = function() {
                $window.ga('send', 'pageview', {
                    'page': $location.path()
                });
            };

            $rootScope.$on('$routeChangeSuccess', track);
        }
    };
});
