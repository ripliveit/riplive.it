'use strict';

angular.module('riplive')

/**
 * Define and return the GenreSong resource.
 * Implements methods to retrieve data from the remote server.
 *
 * @param  {Object} $resource
 * @return {Object}
 */
.factory('genreSong', function genreSong($resource) {
    return $resource('/api/genres/songs/', {}, {
        list: {
            isArray: false,
            method: 'GET',
            transformResponse: function(data, headers) {
                var parsed = JSON.parse(data);
                return parsed;
            }
        }
    });
});
