'use strict';

angular.module('riplive')

/**
 * Define and return the Search resource.
 * Implements methods to retrieve data from the remote server.
 *
 * @param  {Object} $resource
 * @return {Object}
 */
.factory('search', function search($resource) {
    return $resource('/api/search', {}, {
        list: {
            isArray: false,
            method: 'GET',
            params : {
                search : '@search',
                page   : '@page',
                count  : 12
            },
            transformResponse: function(data, headers) {
                var parsed = JSON.parse(data);
                return parsed;
            }
        },
    });
});
