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
         * Return a single news.
         *
         * @param  {String}   slug The news unique slug.
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
        },

        /**
         * Return all news with the same tag,
         * except the one specified by the slug parameter.
         * 
         * @param  {String}   slug   Slug of the news from wich start the relation.
         * @param  {Object}   params Used for pagination.
         * @param  {Function} cb     Fired when date are retrieved from the server.
         * @return {undefined}
         */
        getRelatedNews: function(slug, params, cb) {
            var tags = Tag.list(params);
            var related = [];

            tags.$promise.then(function(data) {
                data.posts.forEach(function(post) {
                    if (post.slug !== slug) {
                        related.push(post);
                    }
                });

                cb(related);
            });
        }
    };
});
