'use strict';

angular.module('riplive')

/**
 * Define and return the Chart resource.
 * Implements methods to retrieve data from the remote server.
 * 
 * @param  {Object} $resource
 * @return {Object}
 */
.factory('chart', function chart($resource) {
    return $resource('/api/charts/:slug', {
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
            transformResponse: function(data, headers) {
                var parsed = JSON.parse(data);
                return parsed;
            }
        }
    });
});
