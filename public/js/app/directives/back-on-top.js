'use strict';

angular.module('riplive')
    /**
     * Return to the top of the page (with an animation)
     * when a user click on the directive's button.
     *
     * @return {undefined}
     */
    .directive('backOnTop', function() {
        return {
            templateUrl: 'js/app/templates/back-on-top.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                element.on('click', function() {
                    $('html, body').animate({
                        scrollTop: 0
                    }, 1300);
                });
            }
        };
    });
