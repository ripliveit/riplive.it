'use strict';

/**
 * Riplive.it Application
 *
 * @author Gabriele D'Arrigo - @acirdesign
 */
angular.module('riplive', [
    'ngTouch',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'angular-carousel',
    'ui.bootstrap',
    'LocalStorageModule'
])

/**
 * Define all route configuration.
 * Use html5 history state for all page.
 *
 * @param  {Object} $routeProvider
 * @param  {Object} $locationProvider
 * @return {undefined}
 */
.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');

    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .when('/artists', {
            templateUrl: 'views/artists-list.html',
            controller: 'ArtistsCtrl'
        })
        .when('/artists/:slug', {
            templateUrl: 'views/artist.html',
            controller: 'ArtistCtrl'
        })
        .when('/artists/genre/:slug', {
            templateUrl: 'views/artists-list.html',
            controller: 'ArtistsGenreCtrl'
        })
        .when('/artists/tag/:slug', {
            templateUrl: 'views/artists-list.html',
            controller: 'ArtistsTagCtrl'
        })
        .when('/authors', {
            templateUrl: 'views/authors-list.html',
            controller: 'AuthorsCtrl'
        })
        .when('/authors/:slug', {
            templateUrl: 'views/author.html',
            controller: 'AuthorCtrl'
        })
        .when('/categories/:slug', {
            templateUrl: 'views/news-list.html',
            controller: 'CategoriesCtrl'
        })
        .when('/charts', {
            templateUrl: 'views/charts.html',
            controller: 'ChartsCtrl'
        })
        .when('/charts/:slug', {
            templateUrl: 'views/chart.html',
            controller: 'ChartCtrl'
        })
        .when('/news', {
            templateUrl: 'views/news-list.html',
            controller: 'NewsListCtrl'
        })
        .when('/news/:slug', {
            templateUrl: 'views/news.html',
            controller: 'NewsCtrl'
        })
        .when('/programs', {
            templateUrl: 'views/programs.html',
            controller: 'ProgramsCtrl'
        })
        .when('/programs/:slug', {
            templateUrl: 'views/program.html',
            controller: 'ProgramCtrl'
        })
        .when('/podcasts', {
            templateUrl: 'views/podcasts-list.html',
            controller: 'PodcastsCtrl'
        })
        .when('/podcasts/:program_slug', {
            templateUrl: 'views/podcasts-list.html',
            controller: 'PodcastsProgramCtrl'
        })
        .when('/podcasts/:program_slug/:id', {
            templateUrl: 'views/podcast.html',
            controller: 'PodcastCtrl'
        })
        .when('/schedule', {
            templateUrl: 'views/schedule.html',
            controller: 'ScheduleCtrl'
        })
        .when('/songs', {
            templateUrl: 'views/songs-list.html',
            controller: 'SongsCtrl'
        })
        .when('/songs/:slug', {
            templateUrl: 'views/song.html',
            controller: 'SongCtrl'
        })
        .when('/songs/genre/:slug', {
            templateUrl: 'views/songs-list.html',
            controller: 'SongsGenreCtrl'
        })
        .when('/songs/tag/:slug', {
            templateUrl: 'views/songs-list.html',
            controller: 'SongsTagCtrl'
        })
        .when('/tags/:slug', {
            templateUrl: 'views/news-list.html',
            controller: 'TagsCtrl'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .when('/search', {
          templateUrl: 'views/search.html',
          controller: 'SearchCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});
