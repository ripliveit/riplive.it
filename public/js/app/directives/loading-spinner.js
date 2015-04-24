'use strict';

angular.module('riplive')

/**
 * Define a loading spinner directive.
 *
 * @return {Object}
 */
.directive('loadingSpinner', function() {
    return {
        templateUrl: 'js/app/templates/loading-spinner.html',
        restrict: 'E',
        replace: true,
        scope: {
            visible: '='
        }
    };
});
