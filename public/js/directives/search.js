'use strict';

angular.module('riplive')

/**
 * Print a search box.
 * User is redirected after hit on the search button
 * 
 * @param  {Object} $location
 * @param  {Object} sideMenuChannel
 * @return {undefined}
 */
.directive('search', function($location, $timeout, sideMenuChannel) {
    return {
        templateUrl: 'templates/search.html',
        restrict: 'E',
        replace: 'true',
        scope: {
            term: '@'
        },
        link: function postLink(scope, element, attrs) {
            var popOver = element.find('.popover');

            /**
             * First check if the search input box is not empty.
             * If not redirect the user to 
             * Search Controller, setting the search term via query string.
             * 
             * @return {undefined}
             */
            scope.search = function() {
                if (!scope.term) {
                    popOver.show();

                    $timeout(function() {
                        popOver.hide();
                    }, 2500);

                    return false;
                }

                $location.path('/search').search('search', scope.term);
                sideMenuChannel.publish('toggleSideMenu');
            };
        }
    };
});
