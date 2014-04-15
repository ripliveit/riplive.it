'use strict';

angular.module('riplive')

/**
 * A service that implements methods
 * to query and manipulate Program resource.
 * Has $injector as dependency, using it to retrieve the desired
 * resource.
 *
 * @param  {Object} $injector
 * @return {Object}
 */
.service('userService', function userService($injector, localStorageService) {
    var User = $injector.get('user');

    return {
        getUser: function() {
            return User;
        },

        /**
         * Query the browser local storage
         * to retrieve user data.
         * Return the user object.
         *
         * @return {Object}
         */
        getUserFromLocalStorage: function() {
            var user = localStorageService.get('user');

            return user;
        },

        /**
         * Return a user from the remote server,
         * specifyng it's uuid.
         *
         * @param  {String}   uuid
         * @param  {Function} cb Fired when date are retrieved from the server.
         * @return {undefined}
         */
        getUserByUuid: function(uuid, cb) {
            if (!user) {
                var user = User.get({
                    uuid: uuid
                });

                user.$promise.then(function(data) {
                    return cb(data);
                });
            }
        },

        /**
         * Save the user object into browser's local
         * storage.
         * Return this Object.
         *
         * @param  {Object} data The user object.
         * @return {Object}
         */
        persistUserToLocalStorage: function(data) {
            localStorageService.add('user', data);

            return this;
        },
    };
});
