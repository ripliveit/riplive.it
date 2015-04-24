'use strict';

angular.module('riplive')

/**
 * Define and return the Artist resource.
 * Implements methods to retrieve data from the remote server.
 * 
 * @param  {Object} $resource
 * @return {Object}
 */
.factory('artist', function author($resource) {
    return $resource('/api/artists/:slug', {
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
