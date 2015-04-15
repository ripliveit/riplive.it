'use strict';

angular.module('riplive')

/**
 * A service that implements methods
 * to query and manipulate News resource.
 * Has $injector as dependency, using it to retrieve the desired
 * resource.
 *
 * @param  {Object} $injector
 * @return {Object}
 */
.service('podcastsService', function podcastsService($injector) {
    var Podcast = $injector.get('podcast');

    return {

        /**
         * Return a single podcast.
         * 
         * @param  {String}   programSlug The programs's sluig
         * @param  {Int}      id Podcast's id.
         * @param  {Function} cb Fired when date are retrieved from the server.
         * @return {undefined}
         */
        getPodcast: function(programSlug, id, cb) {
            var podcast = Podcast.get({
                program_slug: programSlug,
                id: id
            });

            podcast.$promise.then(function(data) {
                cb(data);
            });
        },

        /**
         * Return all podcasts
         *
         * @param  {Object}    params Used for pagination.
         * @param  {Function}  cb Fired when date are retrieved from the server.
         * @return {undefined}
         */
        getPodcasts: function(params, cb) {
            var podcasts = Podcast.list(params);

            podcasts.$promise.then(function(data) {
                cb(data);
            });
        },
    };
});
