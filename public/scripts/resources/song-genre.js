'use strict';

angular.module('riplive')

/**
 * Define and return the SongGenre resource.
 * Implements methods to retrieve data from the remote server.
 *
 * @param  {Object} $resource
 * @return {Object}
 */
.factory('songGenre', function songGenre($resource) {
    return $resource('/api/songs/genre/:slug', {
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
                return JSON.parse(data);
            }
        }
    });
});
