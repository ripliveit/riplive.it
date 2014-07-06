'use strict';

angular.module('riplive')

/**
 * The websocket
 * connection handler.
 */
.service('socketIo', function socketIo() {
    var retry = 0;

    /**
     * Socket configuration.
     *
     * @type {Object}
     */
    var socket = io('http://onair.riplive.it:8082');

    /**
     * Log whn connection is open.
     *
     */
    socket.on('open', function() {
        console.log('opened');
    });

    /**
     * Try to reconnect ten times
     * in case of error.
     *
     */
    socket.on('close', function() {
        console.log('Closed socket connection. Attempting reconnection');
    });

    /**
     * Return the socket object.
     */
    return {
        socket: socket
    };
});
