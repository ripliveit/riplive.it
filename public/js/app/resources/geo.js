'use strict';

angular.module('riplive')

/**
 * Define and return the Artist resource.
 * Implements methods to retrieve data from the remote server.
 * 
 * @param  {Object} $resource
 * @return {Object}
 */
.factory('geo', function geo($resource) {
    return $resource('/data/geo.json', {}, {
        get: {
            isArray: false,
            method: 'GET',
            transformResponse: function(data, headers) {
                var parsed = JSON.parse(data);
                return parsed; 
            }
        }
    });
});
