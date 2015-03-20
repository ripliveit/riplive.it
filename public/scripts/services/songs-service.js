'use strict';

angular.module('riplive')

/**
 * A service that implements methods
 * to query and manipulate Song resource.
 * Has $injector as dependency, using it to retrieve the desired
 * resource.
 *
 * @param  {Object} $injector
 * @return {Object}
 */
.service('songsService', function songsService($injector) {
    var Song = $injector.get('song');
    var SongGenre = $injector.get('songGenre');
    var SongTag = $injector.get('songTag');

    return {

        /**
         * Return a single song.
         *
         * @param  {String}   slug The chart's unique slug.
         * @param  {Function} cb Fired when date are retrieved from the server.
         * @return {undefined}
         */
        getSong: function(slug, cb) {
            var song = Song.get({
                slug: slug
            });

            song.$promise.then(function(data) {
                cb(data);
            });
        },

        /**
         * Return a list of songs.
         *
         * @param  {Object}    params Used for pagination.
         * @param  {Function} cb Fired when date are retrieved from the server.
         * @return {undefined}
         */
        getSongs: function(params, cb) {
            var songs = Song.list(params);

            songs.$promise.then(function(data) {
                cb(data);
            });
        },

        /**
         * Return a list of songs of a specific genre.
         *
         * @param  {Object}    params Used for pagination.
         * @param  {Function} cb Fired when date are retrieved from the server.
         * @return {undefined}
         */
        getSongsByGenre: function(params, cb) {
            var songs = SongGenre.list(params);

            songs.$promise.then(function(data) {
                cb(data);
            });
        },

        /**
         * Return all songs with a specific tag.
         *
         * @param  {Object}    params Used for pagination.
         * @param  {Function} cb Fired when date are retrieved from the server.
         * @return {undefined}
         */
        getSongsByTag: function(params, cb) {
            var songs = SongTag.list(params);

            songs.$promise.then(function(data) {
                cb(data);
            });
        }
    };
});
