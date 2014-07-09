'use strict';

angular.module('riplive')

/**
 * The websocket
 * connection handler.
 */
.service('socketIo', function socketIo() {
    var connect = function(url) {
        var socket = io(url);

        return socket;
    };

    /**
     * Return the io object and a connect meth
     */
    return {
        io: io,
        connect : connect
    };
});
