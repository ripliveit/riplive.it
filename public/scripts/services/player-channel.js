'use strict';

angular.module('riplive')

/**
 * A PubSub service used to subscribe and notify events about
 * the streaming player.
 *
 * @param  {Object} $rootScope
 * @return {Object}
 */
.service('playerChannel', function playerChannel($rootScope) {

    /**
     * All channel's topics.
     *
     * @type {Array}
     */
    var topics = ['playPause', 'playerStatus', 'volumeUp', 'volumeOff'];

    /**
     * A publish function, used by client to
     * notify data to all subscribers.
     *
     * @param  {String} topic
     * @param  {Object} data
     * @return {Object}
     */
    var publish = function(topic, data) {
        if (topics.indexOf(topic) === -1) {
            return false;
        }

        $rootScope.$broadcast(topic, data);

        return this;
    };

    /**
     * Define the subscribe function for playPause event.
     *
     * @param  {Object}   $scope
     * @param  {Function} cb
     * @return {Object}
     */
    var onPlayPause = function($scope, cb) {
        $scope.$on('playPause', function(e, data) {
            cb(e, data);
        });

        return this;
    };

    /**
     * Define the subscribe function for playerStatus event.
     *
     * @param  {Object}   $scope
     * @param  {Function} cb
     * @return {Object}
     */
    var onPlayerStatus = function($scope, cb) {
        $scope.$on('playerStatus', function(e, data) {
            cb(e, data);
        });

        return this;
    };

    /**
     * Define the subscribe function for volumeUp event.
     *
     * @param  {Object}   $scope
     * @param  {Function} cb
     * @return {Object}
     */
    var onVolumeUp = function($scope, cb) {
        $scope.$on('volumeUp', function(e, data) {
            cb(e, data);
        });

        return this;
    };

    /**
     * Define the subscribe function for volumeOff event.
     *
     * @param  {Object}   $scope
     * @param  {Function} cb
     * @return {Object}
     */
    var onVolumeOff = function($scope, cb) {
        $scope.$on('volumeOff', function(e, data) {
            cb(e, data);
        });

        return this;
    };

    /**
     * Return the public interface.
     */
    return {
        publish: publish,
        onPlayPause: onPlayPause,
        onPlayerStatus: onPlayerStatus,
        onVolumeUp: onVolumeUp,
        onVolumeOff: onVolumeOff
    };
});
