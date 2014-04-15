'use strict';

angular.module('riplive')

/**
 * The websocket
 * connection handler.
 */
.service('EngineIo', function EngineIo() {
    var retry = 0;

    /**
     * Socket configuration.
     *
     * @type {Object}
     */
    var socket = eio('ws://onair.riplive.it:8082/', {
        flashPath: 'bower_components/web-socket-js/',
        transports: ['websocket', 'polling', 'flashsocket']
    });

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

        if (retry <= 10) {
            retry += 1;

            var reconnect = setInterval(function() {
                socket.open();
                clearInterval(reconnect);
            }, 2000);
        } else {
            return false;
        }
    });

    /**
     * Return the socket object.
     */
    return {
        socket: socket
    };
});
