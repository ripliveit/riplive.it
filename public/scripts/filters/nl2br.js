'use strict';

angular.module('riplive')

/**
 * Insert a <br/> tag in place of
 * all new lines.
 *
 * @return {String}
 */
.filter('nl2br', function nl2br() {
    return function(input) {
        if (input) {
            return input.replace(/\n/g, '<br/>');
        }
    };
});
