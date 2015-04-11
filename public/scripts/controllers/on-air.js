'use strict';

angular.module('riplive')

/**
 * Handle the real time data about on air song.
 * Change the current song information and images according to
 * the incoming websocket's data.
 * Use Engine.io service to read data from ws.
 *
 * @param {Object} $scope
 * @param {Object} EngineIo
 */
.controller('OnAirCtrl', function OnAirCtrl($scope, socketIo) {
    var socket = socketIo.connect('http://onair.riplive.it:8082');

    /**
     * Images used in case of not found song
     * or with an on air program.
     *
     * @type {Object}
     */
    var images = {
        program: 'https://s3-eu-west-1.amazonaws.com/riplive.it-images/onair/rip_authors.jpg',
        notFound: [
            'https://s3-eu-west-1.amazonaws.com/riplive.it-images/onair/vinyl-1.jpg',
            'https://s3-eu-west-1.amazonaws.com/riplive.it-images/onair/vinyl-2.jpg',
            'https://s3-eu-west-1.amazonaws.com/riplive.it-images/onair/vinyl-3.jpg',
            'https://s3-eu-west-1.amazonaws.com/riplive.it-images/onair/vinyl-4.jpg'
        ]
    };

    /**
     * Return a random not found images.
     *
     * @return {String}
     */
    var getImage = function() {
        var index = Math.floor(Math.random() * images['notFound'].length);
        return images['notFound'][index];
    };

    /**
     * Change the current song.
     *
     * @param  {Object} song
     * @return {undefined}
     */
    var changeSong = function(song) {
        $scope.$apply(function() {
            $scope.song = song;
        });
    };

    /**
     * On socket error change the current
     * song to notFound Object.
     *
     * @param  {Object} err
     * @return {undefined}
     */
    socket.on('error', function(err) {
        changeSong({
            artist: 'No song',
            title: 'in archive',
            image: getImage()
        });
    });

    /**
     * On socket message change the current song
     * according to the type of the received object.
     *
     * @param  {Object} message
     * @return {undefined}
     */
    socket.on('song', function(song) {
        var data = JSON.parse(song);

        if (data.status === 'error') {
            changeSong({
                artist: 'No song',
                title: 'in archive',
                image: getImage()
            });

            return false;
        }

        if (data.type === 'adv') {
            changeSong({
                artist: 'Advertising',
                title: 'This is a jingle dude!',
                image: getImage()
            });

            return false;
        }

        if (data.type === 'programs') {
            data.image = images['program'];
            changeSong(data);

            return false;
        }

        // Change
        // the current song.
        changeSong({
            id_song: data.posts[0].id,
            artist: data.artist,
            title: data.title,
            image: data.posts[0]['thumbnail_images']['landscape-medium']['url'],
            images: data.posts[0].thumbnail_images,
            info: data.posts[0]
        });
    });
});
