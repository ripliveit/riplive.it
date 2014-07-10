'use strict';


angular.module('riplive')

/**
 * Load and display all riplive's photos.
 *
 * @param {Object} $scope
 * @param {Object} socketIo
 */
.controller('PhotosCtrl', function PhotosCtrl($scope, socketIo) {
    //Connect to remote websocket server.
    var socket = socketIo.connect('http://onair.riplive.it:80');

    $scope.loading = true;

    /**
     * Draw photos grid
     * when the server emit the 'photos' server
     *
     * @param  {Array} data
     * @return {undefined}
     */
    socket.on('photos', function(data) {
        $scope.$apply(function() {
            $scope.loading = false;
            $scope.photos = data;
        });
    });

    /**
     * Push a single photo into the
     * photos array when the server emit the 'photo' event.
     * A photo can have multiple tag to which server is subscribed, so
     * as a collateral effect, the same photo can be pushed twice.
     * So, before pushing, the script check if a photo with the same id
     * is already in place.
     * 
     * @param  {Object} data
     * @return {undefined}
     */
    socket.on('photo', function(data) {
        var found = false;

        for (var i = 0, len = $scope.photos.length; i < len; i++) {
            if ($scope.photos[i].id === data.id) {
                found = true;
            }
        }

        if (!found) {
            $scope.$apply(function() {
                $scope.photos.unshift(data);
            });
        }
    });
});

