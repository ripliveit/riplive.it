'use strict';

angular.module('riplive')

/**
 * Defines the directive for the interface control in the top nav menu.
 * Make use of a PubSub implementation to notify to all
 * others components of the interface what are the application's status.
 * All PubSub channels are injected as dependencies.
 *
 * @param  {Object} playerChannel
 * @param  {Object} sideMenuChannel
 * @param  {Object} onAirChannel
 * @return {undefined}
 */
.directive('navControls', function(playerChannel, sideMenuChannel, onAirChannel) {
    return {
        templateUrl: 'js/app/templates/nav-controls.html',
        replace: true,
        restrict: 'E',
        link: function postLink(scope, element, attrs) {
            var controls      = element;
            var playerControl = element.find('.player-control');
            var onAirControl  = element.find('#on-air-btn');
            var rebel         = element.find('#rebel');
            var popover       = element.find('.popover');
            var open          = false;

            // Notify when user click on side menu button.
            scope.toggleSideMenu = function() {
                sideMenuChannel.publish('toggleSideMenu');
            };

            // Notify when user click on toggle-on-air button.
            scope.toggleOnAir = function() {
                onAirChannel.publish('toggleOnAir');
            };

            // Notify when user click on play/pause button.
            scope.playPause = function() {
                playerChannel.publish('playPause');
            };

            // Notify when user click on volume up / volume off buttons.
            scope.volumeUp = function() {
                playerChannel.publish('volumeUp');
            };

            scope.volumeOff = function() {
                playerChannel.publish('volumeOff');
            };

            /**
             * Subscribe to streaming player
             * and accordingly change the relative button appearence.
             *
             * @param  {Object} e
             * @param  {Object} status
             * @return {undefined}
             */
            playerChannel.onPlayerStatus(scope, function(e, status) {
                if (status.data === true) {
                    playerControl.removeClass('fa-play')
                        .addClass('fa-pause');
                } else {
                    playerControl.removeClass('fa-pause')
                        .addClass('fa-play');
                }
            });

            /**
             * Subscribe to onAir modal status (open/close),
             * and accordingly change the relative button appearence.
             *
             * @param  {Object} e
             * @param  {Object} status
             * @return {undefined}
             */
            onAirChannel.onOnAirStatus(scope, function(e, status) {
                onAirControl.toggleClass('active');
            });
        }
    };
});