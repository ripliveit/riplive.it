'use strict';

angular.module('riplive')

/**
 * Return an html string without stripping tags or src's uris.
 *
 * @param  {Object} $sce
 * @return {String}
 */
.filter('unsafeHtml', function unsafeHtml($sce) {
    return function(input) {
        return $sce.trustAsHtml(input);
    };
});
