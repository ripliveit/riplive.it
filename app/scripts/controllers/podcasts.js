'use strict';

angular.module('riplive')

/**
 * Return a list of all application's podcasts.
 * User can filter and load specific program'd podcast choosing
 * a program from a select box or from a series of buttons, each one with the
 * name of a program.
 * Podcasts are lazy loaded on user's scroll.
 * List of programs are loaded thorugh programsService.
 *
 * @param {Object} $scope
 * @param {Object} programsService
 * @param {Object} podcastsService
 * @param {Object} generalService
 */
.controller('PodcastsCtrl',
    function PodcastsCtrl($scope, $location, programsService, podcastsService, generalService) {
        var current = 1;
        var pages = 0;
        $scope.podcasts = [];

        /**
         * Load all programs that has at least
         * one associated podcast.
         *
         * @return {undefined}
         */
        var loadPrograms = function() {
            programsService.getPrograms({
                'status[]': ['publish', 'pending']
            }, function(data) {
                $scope.programs = data.programs;
            });
        };

        /**
         * Load all podcasts.
         *
         * @param  {Object} program
         * @return {undefined}
         */
        var loadPodcasts = function() {
            $scope.loading = true;

            var params = {
                page: current
            };

            podcastsService.getPodcasts(params, function(data) {
                $scope.loading = false;
                pages = data.pages;

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
            if (current >= pages) {
                return false;
            }

            current += 1;
            loadPodcasts();
        };

        // On controller 
        // init load all programs and podcasts.
        loadPrograms();
        loadPodcasts();
    });
