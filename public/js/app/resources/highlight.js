'use strict';

angular.module('riplive')

/**
 * Define and return the Highlight resource.
 * Implements methods to retrieve data from the remote server.
 *
 * @param  {Object} $resource
 * @return {Object}
 */
.factory('highlight', function highlight($resource) {
    return $resource('/api/highlights/:slug', {
        slug: '@slug'
    }, {
        list: {
            isArray: false,
            method: 'GET',
            params: {
                count: 6,
                page: '@page'
            },
            transformResponse: function(data, headers) {
                var parsed = JSON.parse(data);
                return parsed;
            }
        }
    });
});
