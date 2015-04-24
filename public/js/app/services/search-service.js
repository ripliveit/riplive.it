'use strict';

angular.module('riplive')
/**
 * Implements business logic to
 * related to the user's search operation.
 *
 * @param  {Object} $injector
 * @return {Object}
 */
.service('searchService', function searchService($injector) {
    var Search = $injector.get('search');

    /**
     * A configuration object
     * with all allowed types of search results.
     *
     * @type {Object}
     */
    var types = {
        artists: {
            classes: 'btn-artists fa-user',
            link: '/artists/'
        },
        charts: {
            classes: 'btn-charts fa-bar-chart-o',
            link: '/charts/'
        },
        post: {
            classes: 'btn-news fa-bullhorn',
            link: '/news/'
        },
        programs: {
            classes: 'btn-programs fa-microphone',
            link: '/programs/'
        },
        songs: {
            classes: 'btn-songs fa-headphones',
            link: '/songs/'
        }
    };

    /**
     * Not allowed types
     * of search results.
     *
     * @type {Array}
     */
    var notAllowed = ['highlights', 'labels'];

    /**
     * Filter the search array.
     * All not allowed results are spliced from the array,
     * and additional informations like section's link, and css classes,
     * are attacched to each single item in the array.
     *
     * @param  {Array} items The array that will be filtered.
     * @return {Array}
     */
    var filterSearchResults = function(items) {
        for (var i = 0, len = items.length; i < len; i++) {

            // Remove all unwanted result.
            if (notAllowed.indexOf(items[i]['type']) !== -1) {
                items.splice(i, 1);
                --len;
                continue;
            }

            // Attach
            // additional information to the item.
            if (Object.keys(types).indexOf(items[i]['type']) !== -1) {
                items[i]['classes'] = types[items[i]['type']]['classes'];
                items[i]['link'] = types[items[i]['type']]['link'] + items[i]['slug'];
            }
        }

        return items;
    };

    return {

        /**
         * A method used to
         * retrieve search results from the remote server.
         *
         * @param  {Object}   params   Ues to populate the search query
         *                       and to paginate data.
         * @param  {Function} cb Fired when promise is fullfilled.
         * @return {undefined}
         */
        getSearchResults: function(params, cb) {
            var results = Search.list(params);

            results.$promise.then(function(data) {
                data.posts = filterSearchResults(data.posts);
                cb(data);
            });
        }
    };
});
