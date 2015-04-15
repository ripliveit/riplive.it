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
.service('newsService', function newsService($injector) {
    var News = $injector.get('news');
    var Category = $injector.get('category');
    var Tag = $injector.get('tag');

    return {

        /**
         * Return a single chart.
         *
         * @param  {String}   slug The chart's unique slug.
         * @param  {Function} cb Fired when date are retrieved from the server.
         * @return {undefined}
         */
        getNewsBySlug: function(slug, cb) {
            var news = News.get({
                slug: slug
            });

            news.$promise.then(function(data) {
                cb(data);
            });
        },

        /**
         * Return all news
         *
         * @param  {Object}    params Used for pagination.
         * @param  {Function}  cb Fired when date are retrieved from the server.
         * @return {undefined}
         */
        getNews: function(params, cb) {
            var news = News.list(params);

            news.$promise.then(function(data) {
                cb(data);
            });
        },

        /**
         * Return all news of a specific category.
         *
         * @param  {Object}    params Used for pagination.
         * @param  {Function}  cb Fired when date are retrieved from the server.
         * @return {undefined}
         */
        getNewsByCategory: function(params, cb) {
            var categories = Category.list(params);

            categories.$promise.then(function(data) {
                cb(data);
            });
        },

        /**
         * Return all news within a specific tag.
         *
         * @param  {Object}    params Used for pagination.
         * @param  {Function}  cb Fired when date are retrieved from the server.
         * @return {undefined}
         */
        getNewsByTag: function(params, cb) {
            var tags = Tag.list(params);

            tags.$promise.then(function(data) {
                cb(data);
            });
        }
    };
});
