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
.directive('voteSong', function voteSong($location, voteService) {
    return {
        templateUrl: 'js/app/templates/vote-song.html',
        replace: true,
        restrict: 'E',
        scope: {
            idSong: '=',
            chartArchiveSlug: '=?',
            userVote: '=?'
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
                popOver.show(function() {
                    angular.element(this).delay(1500).fadeOut(800);
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
             *
             * @return {undefined}
             */
            var voteHandler = function() {
                // If undefined
                // probably is and adv or a program.
                if (typeof scope.idSong === 'undefined') {
                    showPopOver('You cannot vote now!');
                    return false;
                }

                showLoading();

                var params = {
                    id_song: scope.idSong,
                    chart_archive_slug: scope.chartArchiveSlug
                };

                // Attempts
                // to vote the choosen song.
                voteService.voteSong(params, function(data) {
                    hideLoading();

                    if (data.status === 'error') {
                        return showPopOver('Can\'t vote same song twice a day!');
                    }

                    scope.userVote += 1;
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
