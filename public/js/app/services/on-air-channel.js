'use strict';

angular.module('riplive')

/**
 * A PubSub service used to subscribe and notify events about
 * the on air modal window.
 *
 * @param  {Object} $rootScope
 * @return {Object}
 */
.service('onAirChannel', function onAirChannel($rootScope) {

    /**
     * All channel's topics.
     * 
     * @type {Array}
     */
    var topics = ['toggleOnAir', 'onAirStatus'];

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
     * Define the subscribe function for toggleOnAir event.
     *
     * @param  {Object}   $scope
     * @param  {Function} cb
     * @return {Object}
     */
    var onToggleOnAir = function($scope, cb) {
        $scope.$on('toggleOnAir', function(e, data) {
            cb(e, data);
        });

        return this;
    };

    /**
     * Define the subscribe function for onAirStatus event.
     *
     * @param  {Object}   $scope
     * @param  {Function} cb
     * @return {Object}
     */
    var onOnAirStatus = function($scope, cb) {
        $scope.$on('onAirStatus', function(e, data) {
            cb(e, data);
        });

        return this;
    };

    /**
     * Return the public interface.
     */
    return {
        publish: publish,
        onToggleOnAir: onToggleOnAir,
        onOnAirStatus: onOnAirStatus
    };
});
