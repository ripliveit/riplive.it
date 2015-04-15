'use strict';

angular.module('riplive')

/**
 * Define a directive that
 * handle social share windows.
 *
 * @param  {Object} $window
 * @return {undefined}
 */
.directive('socialButtons', function($window) {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: 'templates/social-buttons.html',
        scope: {
            href: '=',
            image: '=',
            title: '=',
            text: '='
        },
        link: function postLink(scope, element, attrs) {
            var site = 'http://riplive.it';

            /**
             * Share via facebook dialog.
             * 
             * @return {undefined}
             */
            scope.facebookShare = function() {
                var url = 'https://www.facebook.com/dialog/feed?app_id=1380026972276511' 
                + '&redirect_uri=' + site + scope.href 
                + '&link=' + site + scope.href 
                + '&picture=' + scope.image 
                + '&caption=' + scope.title 
                + '&description=' + scope.text 
                + '&actions={"name":"Riplive.it - The next step", "link" :"http://www.riplive.it"}';

                $window.open(url, 'facebook-share-dialog', 'width=800,height=550');
            };

            /**
             * Share via twitter dialog.
             * 
             * @return {undefined}
             */
            scope.twitterShare = function() {
                var url = 'https://twitter.com/intent/tweet?via=webrip&text=' 
                + encodeURIComponent(scope.title) 
                + '&hashtags=riplive' 
                + '&url=' + encodeURIComponent(site + scope.href);

                $window.open(url, 'twitter-share-dialog', 'width=800,height=550');
            };
        }
    };
});
