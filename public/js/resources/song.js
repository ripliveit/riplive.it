'use strict';

angular.module('riplive')

/**
 * Define and return the Song resource.
 * Implements methods to retrieve data from the remote server.
 *
 * @param  {Object} $resource
 * @return {Object}
 */
.factory('song', function song($resource) {
    return $resource('/api/songs/:slug', {
        slug: '@slug'
    }, {
        get: {
            isArray: false,
            method: 'GET',
            transformResponse: function(data, headers) {
                var parsed = JSON.parse(data);
                return parsed;
            }
        },
        list: {
            isArray: false,
            method: 'GET',
            params: {
                count: 24,
                page: '@page',
                divide: '@divide'
            },
            transformResponse: function(data, headers) {
                var parsed = JSON.parse(data);
                return parsed;
            }
        }
    });
});
