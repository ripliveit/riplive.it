'use strict';

angular.module('riplive')

/**
 * Define a loading spinner directive.
 *
 * @return {Object}
 */
.directive('loadingSpinner', function() {
    return {
        templateUrl: 'templates/loading-spinner.html',
        restrict: 'E',
        replace: true,
        scope: {
            visible: '='
        }
    };
});
