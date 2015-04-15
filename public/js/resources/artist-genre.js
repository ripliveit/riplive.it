'use strict';

angular.module('riplive')

/**
 * Define and return the ArtistGenre resource.
 * Implements methods to retrieve data from the remote server.
 * 
 * @param  {Object} $resource
 * @return {Object}
 */
.factory('artistGenre', function author($resource) {
    return $resource('/api/artists/genre/:slug', {
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
