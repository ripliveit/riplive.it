'use strict';


angular.module('riplive')

/**
 * [PhotosCtrl description]

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
         * 
         * @param  {Object} data
         * @return {undefined}
         */
        socket.on('photo', function(data) {
            $scope.$apply(function() {
                $scope.photos.unshift(data);
            });
        })
    });
