'use strict';

angular.module('riplive')

/**
 * Define and return the User resource.
 * Implements methods to retrieve data from the remote server.
 *
 * @param  {Object} $resource
 * @return {Object}
 */
.factory('user', function user($resource) {
    return $resource('/api/users/:uuid', {
        uuid: '@uuid'
    }, {
        get: {
            isArray: false,
            method: 'GET',
            transformResponse: function(data, headers) {
                var parsed = JSON.parse(data);
                return parsed;
            }
        }
    });
});
