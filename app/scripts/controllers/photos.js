'use strict';

angular.module('riplive')
    .controller('PhotosCtrl', function PhotosCtrl($scope, socketIo) {
        var socket = socketIo.connect('http://onair.riplive.it:80');

        $scope.loading = true;

        socket.on('photos', function(data) {
            console.log(data);
            $scope.$apply(function() {
                $scope.loading = false;
                $scope.photos = data;
            });
        });

        socket.on('photo', function(data) {
            $scope.$apply(function() {
                $scope.photos.unshift(data);
            });
        })
    });
