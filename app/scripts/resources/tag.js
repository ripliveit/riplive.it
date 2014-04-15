'use strict';

angular.module('riplive')

/**
 * Define and return the Tag resource.
 * Implements methods to retrieve data from the remote server.
 *
 * @param  {Object} $resource
 * @return {Object}
 */
.factory('tag', function tag($resource) {
    return $resource('/api/tags/:slug', {
        slug: '@slug'
    }, {
        list: {
            isArray: false,
            method: 'GET',
            params: {
                count: 12,
                page: '@page'
            },
            transformResponse: function(data, headers) {
                var parsed = JSON.parse(data);
                return parsed;
            }
        }
    });
});
