'use strict';

angular.module('riplive')

/**
 * A filter that, given a string
 * return that string without html tag.
 *
 * @return {Function}
 */
.filter('stripHtml', function stripHtml() {
    return function(input) {
        if (input) {
            return String(input).replace(/<[^>]+>/gm, '');
        }
    };
});
