'use strict';

angular.module('riplive')

/**
 * Define and return the Program resource.
 * Implements methods to retrieve data from the remote server.
 *
 * @param  {Object} $resource
 * @return {Object}
 */
.factory('program', function program($resource) {
    return $resource('/api/programs/:slug', {
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
                'status[]': '@status'
            },
            transformResponse: function(data, headers) {
                var parsed = JSON.parse(data);
                return parsed;
            }
        }
    });
});