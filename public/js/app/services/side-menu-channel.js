'use strict';

angular.module('riplive')

/**
 * A PubSub service used to subscribe and notify events about
 * the side menu.
 *
 * @param  {Object} $rootScope
 * @return {Object}
 */
.service('sideMenuChannel', function sideMenuChannel($rootScope) {

    /**
     * All channel's topics.
     *
     * @type {Array}
     */
    var topics = ['toggleSideMenu', 'sideMenuStatus'];

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
     * Define the subscribe function for toggleSideMenu event.
     *
     * @param  {Object}   $scope
     * @param  {Function} cb
     * @return {Object}
     */
    var onToggleSideMenu = function($scope, cb) {
        $scope.$on('toggleSideMenu', function(e, data) {
            cb(e, data);
        });

        return this;
    };

    /**
     * Define the subscribe function for sideMenuStatus event.
     *
     * @param  {Object}   $scope
     * @param  {Function} cb
     * @return {Object}
     */
    var onSideMenuStatus = function($scope, cb) {
        $scope.$on('sideMenuStatus', function(e, data) {
            cb(e, data);
        });

        return this;
    };

    /**
     * Return the public interface.
     */
    return {
        publish: publish,
        onToggleSideMenu: onToggleSideMenu,
        onSideMenuStatus: onSideMenuStatus
    };
});
