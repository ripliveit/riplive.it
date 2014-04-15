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
 * @param  {Object} userService
 * @param  {Object} localStorageService
 * @return {undefined}
 */
.directive('voteSong', function voteSong($location, voteService, userService, localStorageService) {
    return {
        templateUrl: 'templates/vote-song.html',
        replace: true,
        restrict: 'E',
        scope: {
            idSong: '=',
            chartArchiveSlug: '=',
            userVote: '='
        },
        link: function postLink(scope, element, attrs) {
            var btn = element.find('.btn-like');
            var heart = element.find('.fa-heart');
            var popOver = element.find('.popover');
            var popOverContent = element.find('.popover-content');

            /**
             * Show (and fadeout)
             * the popover with the vote result's message.
             *
             * @param  {string} message
             * @return {undefined}
             */
            var showPopOver = function(message) {
                popOverContent.text(message);
                popOver.fadeIn(function() {
                    angular.element(this).delay(1500).fadeOut(1000);
                });
            };

            /**
             * Show a loading spinner during
             * the vote process.
             *
             * @return {undefined}
             */
            var showLoading = function() {
                heart.removeClass('fa-heart').addClass('fa-spinner');
            };

            /**
             * Hide the loading spinner.
             * @return {undefined}
             */
            var hideLoading = function() {
                heart.removeClass('fa-spinner').addClass('fa-heart');
            };

            /**
             * Handle the vote action business logic.
             * First check if the user is logged in queryng the browser storage.
             * If not redirect the user to the login's page.
             * Otherwise attempt to vote through  voteService.
             *
             * In case of failure show a pertinent message.
             * Otherwise increment the vote plus one and save the results into
             * the browser storage.
             *
             * @return {undefined}
             */
            var voteHandler = function() {
                var user = userService.getUserFromLocalStorage();

                if (!user) {
                    return scope.$apply(function() {
                        $location.path('/login');
                    });
                }

                showLoading();

                var params = {
                    id_song: scope.idSong,
                    chart_archive_slug: scope.chartArchiveSlug,
                    uuid_user: user.user.uuid,
                    username: user.user.username
                };

                // Attempts
                // to vote the choosen song.
                voteService.voteSong(params, function(data) {
                    hideLoading();

                    if (data.status === 'error') {
                        return showPopOver('You can vote a song once a day!');
                    }

                    scope.userVote += 1;
                    localStorageService.set(scope.idSong, {
                        voteDate: new Date()
                    });
                    showPopOver('Thank you!');
                });
            };

            // Add the
            // event handler 
            // to the vote button.
            btn.on('click', voteHandler);
        }
    };
});
