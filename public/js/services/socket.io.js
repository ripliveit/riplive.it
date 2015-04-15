'use strict';


angular.module('riplive')

/**
 * The websocket
 * connection handler.
 */
.service('socketIo', function socketIo() {
    /**
     * Connect to a websocket server.
     * 
     * @param  {String} url
     * @return {Object}
     */
    var connect = function(url) {
        var socket = io(url);

        return socket;
    };

    /**
     * Return the io object and a connection method
     */
    return {
        io: io,
        connect : connect
    };
});
