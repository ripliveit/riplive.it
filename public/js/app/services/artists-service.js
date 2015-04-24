'use strict';

angular.module('riplive')

/**
 * A service that implements methods
 * to query and manipulate Author resource.
 * Has $injector as dependency, using it to retrieve the desired
 * resource.
 *
 * @param  {Object} $injector
 * @return {Object}
 */
.service('artistsService', function artistsService($injector) {
    var Artist = $injector.get('artist');
    var ArtistGenre = $injector.get('artistGenre');
    var ArtistTag = $injector.get('artistTag');

    return {

        /**
         * Return a single artist.
         *
         * @param  {String} slug The author's slug.
         * @param  {Function} cb Fired when date are retrieved from the server.
         * @return {undefined}
         */
        getArtist: function(slug, cb) {
            var artist = Artist.get({
                slug: slug
            });

            artist.$promise.then(function(data) {
                cb(data);
            });
        },

        /**
         * Return all artists.
         *
         * @param  {Object}    params Used for pagination.
         * @param  {Function} cb Fired when date are retrieved from the server.
         * @return {undefined}
         */
        getArtists: function(params, cb) {
            var artists = Artist.list(params);

            artists.$promise.then(function(data) {
                cb(data);
            });
        },

        /**
         * Return all artists of a specific genre.
         *
         * @param  {Object}    params Used for pagination.
         * @param  {Function} cb Fired when date are retrieved from the server.
         * @return {undefined}
         */
        getArtistsByGenre: function(params, cb) {
            var artists = ArtistGenre.list(params);

            artists.$promise.then(function(data) {
                cb(data);
            });
        },

        /**
         * Return all artists with a specific tag.
         *
         * @param  {Object}    params Used for pagination.
         * @param  {Function} cb Fired when date are retrieved from the server.
         * @return {undefined}
         */
        getArtistsByTag: function(params, cb) {
            var artists = ArtistTag.list(params);

            artists.$promise.then(function(data) {
                cb(data);
            });
        }
    };
});
