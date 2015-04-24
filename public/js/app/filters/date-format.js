'use strict';

angular.module('riplive')

/**
 * Return a formatted date.
 * Accept a string with this form: 'dd-mm-yyyy'
 *
 * @param  {Object} $filter
 * @return {String}
 */
.filter('dateFormat', function($filter) {
    return function(input) {
        if (input) {
            var date = new Date(input.replace(/-/g, '/'));

            return $filter('date')(date, 'dd MMMM yyyy');
        }
    };
});
