'use strict';

angular.module('riplive')

/**
 * Return a list of podcasts of a specific program.
 * on user's scroll.
 * List of programs are loaded thorugh programsService.
 *
 * @param {Object} $scope
 * @param {Object} programsService
 * @param {Object} podcastsService
 * @param {Object} generalService
 */
.controller('PodcastsProgramCtrl',
    function PodcastsProgramCtrl($scope, $routeParams, $location, programsService, podcastsService, generalService) {
        var pages = 0;
        var params = {
            page: 1,
            program_slug: $routeParams.program_slug,
        };

        $scope.podcasts = [];

        /**
         * Load all programs that has at least
         * one associated podcast.
         *
         * @return {undefined}
         */
        var loadPrograms = function() {
            programsService.getPrograms({
                podcasts: true
            }, function(data) {
                $scope.programs = data.programs;
            });
        };

        /**
         * Load all podcasts
         * of a specific program.
         *
         * @param  {Object} program
         * @return {undefined}
         */
        var loadPodcasts = function() {
            $scope.loading = true;

            podcastsService.getPodcasts(params, function(data) {
                pages = data.pages;
                $scope.loading = false;
                $scope.subtitle = data.podcasts[0]['program_title'];
                generalService.pushToArray(data.podcasts, $scope.podcasts);
            });
        };

        /**
         * Watch for currentProgram model change, triggering on select box change.
         * Change accordingly the location.
         *
         * @param  {Object} newValue
         * @param  {Object} oldValue
         * @return {undefined}
         */
        $scope.$watch('currentProgram', function(newValue, oldValue) {
            if (newValue) {
                var path = '/podcasts/';
                path += newValue === 'all_programs' ? '' : newValue;

                $location.path(path);
            }
        });

        /**
         * Method invoked by the directive whenScroller
         * to trigger the data loading when the user has reached
         * the bottom of the page.
         *
         * @return {undefined}
         */
        $scope.loadData = function() {
            if (params['page'] >= pages) {
                return false;
            }

            params['page'] += 1;
            loadPodcasts();
        };

        // On controller 
        // init load all programs.
        loadPrograms();
        loadPodcasts();
    });
