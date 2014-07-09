'use strict';

angular.module('riplive')

/**
 * A directive used to order
 * a layout of photos with a grid or
 * only one column.
 *
 * @return {undefined}
 */
.directive('photosControl', function photosControl() {
    return {
        templateUrl: 'templates/photos-control.html',
        replace: true,
        restrict: 'E',
        link: function postLink(scope, element, attrs) {
            var btn = element.find('.btn');
            var grid = true;

            /**
             * Order photos one below the other,
             * in one columns.
             *
             * @return {undefined}
             */
            var toOneColumn = function() {
                btn.addClass('rotated')


                angular.element('.media-wrapper')
                    .addClass('media-wrapper-large');
            };

            /**
             * Order photos in a grid.
             *
             * @return {undefined}
             */
            var toGrid = function() {
                btn.removeClass('rotated')

                angular.element('.media-wrapper-large')
                    .removeClass('media-wrapper-large');
            };

            // Chek if layout
            // must be drawn with a grid of photos or
            // with a single columns
            element.on('click', function() {
                if (grid === true) {
                    grid = false;
                    toOneColumn();
                } else {
                    grid = true;
                    toGrid();
                }
            });
        }
    };
});
