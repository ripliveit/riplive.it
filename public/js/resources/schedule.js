'use strict';

angular.module('riplive')

/**
 * Define and return the Schedule resource.
 * Implements methods to retrieve data from the remote server.
 *
 * @param  {Object} $resource
 * @return {Object}
 */
.factory('schedule', function schedule($resource) {
    return $resource('/api/schedule', {
        slug: '@slug'
    }, {
        list: {
            isArray: true,
            method: 'GET',
            transformResponse: function(data, headers) {
                var parsed = JSON.parse(data);
                return parsed.schedule;
            }
        },
    });
});
