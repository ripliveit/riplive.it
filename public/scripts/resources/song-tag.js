'use strict';

angular.module('riplive')

/**
 * Define and return the SongTag resource.
 * Implements methods to retrieve data from the remote server.
 *
 * @param  {Object} $resource
 * @return {Object}
 */
.factory('songTag', function songTag($resource) {
    return $resource('/api/songs/tag/:slug', {
        slug: '@slug'
    }, {
        list: {
            isArray: false,
            method: 'GET',
            params: {
                count: 24,
                page: '@page',
                divide: '@divide'
            },
            transformResponse: function(data, headers) {
                var parsed = JSON.parse(data);
                return parsed;
            }
        }
    });
});
