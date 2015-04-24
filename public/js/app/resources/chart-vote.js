'use strict';

angular.module('riplive')

/**
 * Define and return the ChartVote resource.
 * Implements methods to retrieve data from the remote server.
 * 
 * @param  {Object} $resource
 * @return {Object}
 */
.factory('chartVote', function chartVote($resource) {
    return $resource('/api/charts/vote', {}, {
        save: {
            isArray: false,
            method: 'POST',
            transformResponse: function(data, headers) {
                var parsed = JSON.parse(data);
                return parsed;
            }
        }
    });
});
