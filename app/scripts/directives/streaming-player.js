'use strict';

angular.module('riplive')

/**
 * Define a directive that wrap jPlayer audio plugin.
 * Make use of playerChannel to publish the current player 
 * status through PubSub.
 *
 * @param  {Object} playerChannel
 * @return {undefined}
 */
.directive('streamingPlayer', function(playerChannel) {
    return {
        replace: true,
        restrict: 'E',
        scope : {
            audio : '=',
            autoplay : '=',
            showControls : '=',
            isStreaming : '='
        },
        templateUrl: 'templates/streaming-player.html',
        link: function postLink(scope, element, attrs) {

            var stream = scope.audio;
            var autoplay = scope.autoplay;
            var isStreaming = scope.isStreaming;
            var volume = 1;
            var playing = false;
            var player = element.find('.player-hidden');
            var control = element.find('.player-control');
            
            scope.$watch('audio', function(newValue, oldValue) {
                if (typeof newValue !== 'undefined') {
                    player.jPlayer('setMedia', { mp3 : newValue });
                }
            });
           
            /**
             * Define jPlayer configuration.
             */
            player.jPlayer({
                ready: function() {
                    $(this).jPlayer('setMedia', {
                        mp3: stream
                    });
                },
                pause: function() {
                    if (isStreaming) {
                        $(this).jPlayer('clearMedia');
                    } else {
                        $(this).jPlayer('pause');
                    }
                },
                stop:function() {
                    if (!isStreaming) {
                        $(this).jPlayer('pause', 0);
                    }
                },
                error: function(event) {
                    if (event.jPlayer.error.type === $.jPlayer.error.URL_NOT_SET) {
                        $(this).jPlayer('setMedia', {
                            mp3: stream
                        }).jPlayer('play');
                    }
                },
                swfPath: 'js',
                supplied: 'mp3',
                preload: 'none',
                wmode: 'window',
            }).bind($.jPlayer.event.play, function() {
                $(this).jPlayer('pauseOthers', 0);
            });

            // Bind 
            // all player events to the current DOM player.
            player.on($.jPlayer.event.play, function() {
                playing = true;
                control.removeClass('fa-play')
                    .addClass('fa-pause');

                playerChannel.publish('playerStatus', { status : 'ok', data : playing });
            });

            player.on($.jPlayer.event.pause, function() {
                playing = false;
                control.removeClass('fa-pause')
                    .addClass('fa-play');

                playerChannel.publish('playerStatus', { status : 'ok', data : playing });
            });

            player.on($.jPlayer.event.stop, function() {
                playing = false;
                control.removeClass('fa-pause')
                    .addClass('fa-play');

                playerChannel.publish('playerStatus', { status : 'ok', data : playing });
            });

            player.on($.jPlayer.event.error, function(err) {
                control.removeClass('fa-pause')
                    .addClass('fa-play');

                playerChannel.publish('playerStatus', {status : 'error', data : err });
            });

            /**
             * Scope function invoked by the user when click on
             * play/pause button. Trigger an event on jPlayer.
             *
             * @return {undefined}
             */
            scope.playPause = function() {
                if (playing === false) {
                    player.jPlayer('play');
                } else {
                    player.jPlayer('pause');
                }
            };

            scope.stop = function() {
                player.jPlayer('stop');
            };

            /**
             * Scope function invoked by the user when click on
             * volume up button.
             * Increase the volume and trigger an event on jPlayer.
             *
             * @return {undefined}
             */
            scope.volumeUp = function() {
                if (volume >= 1) {
                    return false;
                }

                volume += .1;
                player.jPlayer('volume', volume);
            };

            /**
             * Scope function invoked by the user when click on
             * volume off.
             * Decrease the volume and trigger an event on jPlayer
             *
             * @return {undefined}
             */
            scope.volumeOff = function() {
                if (volume <= 0) {
                    return false;
                }

                volume -= .1;
                player.jPlayer('volume', volume);
            };

            /**
             * Subscribe to playPause event,
             * published by the interface controls in navbar.
             * Call the current scope function to play/pause the player.
             * Only streaming player will responde with play; 
             * all other player
             * will be stopped.
             * 
             * @param  {Object} e
             * @param  {boolean} data
             * @return {undefined}
             */
            playerChannel.onPlayPause(scope, function(e, data) {
                if (isStreaming) {
                    scope.playPause();
                }
            });

            /**
             * Subscribe to VolumeUp event,
             * published by the interface controls in navbar.
             * Call the current scope function to adjust the volume.
             *
             * @param  {Object} e
             * @param  {boolean} data
             * @return {undefined}
             */
            playerChannel.onVolumeUp(scope, function(e, data) {
                scope.volumeUp();
            });

            /**
             * Subscribe to VolumeOff event,
             * published by the interface controls in navbar.
             * Call the current scope function to adjust the volume.
             *
             * @param  {Object} e
             * @param  {boolean} data
             * @return {undefined}
             */
            playerChannel.onVolumeOff(scope, function(e, data) {
                scope.volumeOff();
            });
        }
    };
});