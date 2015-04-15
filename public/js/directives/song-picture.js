'use strict';

angular.module('riplive')

/**
 * Define a directive used to print the current icecast
 * song's cover.
 *
 * @return {undefined}
 */
.directive('songPicture', function() {
    return {
        replace: true,
        restrict: 'E',
        scope: {
            song: '='
        },
        templateUrl: 'templates/song-picture.html'
    };
});