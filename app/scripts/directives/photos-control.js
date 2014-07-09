'use strict';

angular.module('riplive')
    .directive('photosControl', function photosControl() {
        return {
            templateUrl: 'templates/photos-control.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                var btn = element.find('.btn span');

                var reorderPhotos = function(e) {
                    btn.removeClass('fa-ellipsis-h').addClass('fa-ellipsis-v');

                    angular.element('.media-block-instagram')
                                        .removeClass('col-lg-4')
                                        .addClass('media-block-instagram-large');
                };

                element.on('click', reorderPhotos);
            }
        };
    });
