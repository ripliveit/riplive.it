'use strict';

angular.module('riplive')

/**
 * A directive that define scrolling behavior.
 * When used as attributes, the whenScrolled directive attacch a scroll
 * event handler on the window;
 * every time a user scroll the directive fire the callback passed as argument
 * to the directive.
 *
 * @param  {Object} $window
 * @param  {Object} $document
 * @return {undefined}
 */
.directive('whenScrolled', function($window, $document) {
    return {
        restrict: 'A',
        link: function postLink(scope, element, attrs) {
            var win = angular.element($window);
            var doc = angular.element($document);

            /**
             * Check the scrollbar position.
             * If the user has reached the bottom of the
             * window than fire the callback passed as argument to the
             * directive.
             *
             * @return {undefined}
             */
            var checkWindowPosition = function() {
                if (win.scrollTop() + 50 > doc.height() - win.height()) {
                    scope.$apply(attrs.whenScrolled);
                }
            };

            // Attach
            // the scroll event handler.
            win.on('scroll', checkWindowPosition);

            // When the
            // route change remove the event handler.
            scope.$on('$routeChangeStart', function(next, current) {
                win.off('scroll', checkWindowPosition);
            });
        }
    };
});
