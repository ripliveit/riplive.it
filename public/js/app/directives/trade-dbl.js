'use strict';

angular.module('riplive')

/**
 * A directive that handle
 * the vote action. 
 * Only a logged user can vote a song.
 * A user can vote a specific song once a day.
 *
 * @param  {Object} $location
 * @param  {Object} voteService
 * @return {undefined}
 */
.directive('tradeDbl', function voteSong($timeout) {
    return {
        template: '<script></script>',
        replace: true,
        restrict: 'E',
        link: function postLink(scope, element, attrs) {
            $timeout(function() {
                var s = angular.element(document.createElement('script'));

                element.attr('type', 'text/javascript');
                element.attr('id', 'td_ads');
                element.attr('src', 'http://hst.tradedoubler.com/file/20649/contextual/cx2.js');
            }, 300);
            
        }
    };
});
