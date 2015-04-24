'use strict';

angular.module('riplive')

/**
 * Define and return the Podcast resource.
 * Implements methods to retrieve data from the remote server.
 *
 * @param  {Object} $resource
 * @return {Object}
 */
.factory('podcast', function podcast($resource) {
    return $resource('/api/podcasts/:program_slug/:id', {
        program_slug: '@slug',
        id: '@id'
    }, {
        get: {
            isArray: false,
            method: 'GET',
            transformResponse: function(data, headers) {
                var parsed = JSON.parse(data);
                return parsed.podcast;
            }
        },
        list: {
            isArray: false,
            method: 'GET',
            params: {
                count: 24,
                page: '@page'
            },
            transformResponse: function(data, headers) {
                var parsed = JSON.parse(data);
                return parsed;
            }
        }
    });
});
