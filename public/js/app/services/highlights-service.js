'use strict';

angular.module('riplive')

/**
 * A service that implements methods
 * to query and manipulate Highlight resource.
 * Has $injector as dependency, using it to retrieve the desired
 * resource.
 *
 * @param  {Object} $injector
 * @return {Object}
 */
.service('highlightsService', function highlightsService($injector) {
    var Highlight = $injector.get('highlight');

    return {

        /**
         * Return all highlights.
         *
         * @param  {Function} cb Fired when date are retrieved from the server.
         * @return {undefined}
         */
        getHighlights: function(cb) {
            var highlights = Highlight.list();

            highlights.$promise.then(function(data) {
                cb(data);
            });
        }
    };
});
