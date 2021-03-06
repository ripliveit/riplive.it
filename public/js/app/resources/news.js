'use strict';

angular.module('riplive')

/**
 * Define and return the News resource.
 * Implements methods to retrieve data from the remote server.
 *
 * @param  {Object} $resource
 * @return {Object}
 */
.factory('news', function news($resource) {
    return $resource('/api/news/:slug', {
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
                author: '@author'
            },
            transformResponse: function(data, headers) {
                var parsed = JSON.parse(data);
                return parsed;
            }
        }
    });
});
