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
.service('authorsService', function authorsService($injector) {
    var Author = $injector.get('author');

    return {

        /**
         * Return a single author.
         * 
         * @param  {String}   slug The chart's unique slug.
         * @param  {Function} cb Fired when date are retrieved from the server.
         * @return {undefined}
         */
        getAuthor: function(slug, cb) {
            var author = Author.get({
                slug: slug
            });

            author.$promise.then(function(data) {
                cb(data);
            });
        },
        
        /**
         * Return a list of authors.
         *
         * @param  {Function} cb Fired when date are retrieved from the server.
         * @return {undefined}
         */
        getAuthors: function(cb) {
            var authors = Author.list();

            authors.$promise.then(function(data) {
                cb(data);
            });
        }
    };
});
