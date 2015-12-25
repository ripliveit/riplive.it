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
    'LocalStorageModule',
    'ngDisqus'
])

/**
 * Define all route configuration.
 * Use html5 history state for all pages.
 *
 * @param  {Object} $routeProvider
 * @param  {Object} $locationProvider
 * @return {undefined}
 */
.config(function($routeProvider, $locationProvider, $disqusProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    }).hashPrefix('!');

    $disqusProvider.setShortname('riplive');

    $routeProvider
        .when('/', {
            templateUrl: 'js/app/views/main.html',
            controller: 'MainCtrl'
        })
        .when('/artists', {
            templateUrl: 'js/app/views/artists-list.html',
            controller: 'ArtistsCtrl'
        })
        .when('/artists/:slug', {
            templateUrl: 'js/app/views/artist.html',
            controller: 'ArtistCtrl'
        })
        .when('/artists/genre/:slug', {
            templateUrl: 'js/app/views/artists-list.html',
            controller: 'ArtistsGenreCtrl'
        })
        .when('/artists/tag/:slug', {
            templateUrl: 'js/app/views/artists-list.html',
            controller: 'ArtistsTagCtrl'
        })
        .when('/authors', {
            templateUrl: 'js/app/views/authors-list.html',
            controller: 'AuthorsCtrl'
        })
        .when('/authors/:slug', {
            templateUrl: 'js/app/views/author.html',
            controller: 'AuthorCtrl'
        })
        .when('/categories/:slug', {
            templateUrl: 'js/app/views/news-list.html',
            controller: 'CategoriesCtrl'
        })
        .when('/charts', {
            templateUrl: 'js/app/views/charts.html',
            controller: 'ChartsCtrl'
        })
        .when('/charts/:slug', {
            templateUrl: 'js/app/views/chart.html',
            controller: 'ChartCtrl'
        })
        .when('/news', {
            templateUrl: 'js/app/views/news-list.html',
            controller: 'NewsListCtrl'
        })
        .when('/news/:slug', {
            templateUrl: 'js/app/views/news.html',
            controller: 'NewsCtrl'
        })
        .when('/photos', {
            templateUrl: 'js/app/views/photos.html',
            controller: 'PhotosCtrl'
        })
        .when('/programs', {
            templateUrl: 'js/app/views/programs.html',
            controller: 'ProgramsCtrl'
        })
        .when('/programs/:slug', {
            templateUrl: 'js/app/views/program.html',
            controller: 'ProgramCtrl'
        })
        .when('/podcasts', {
            templateUrl: 'js/app/views/podcasts-list.html',
            controller: 'PodcastsCtrl'
        })
        .when('/podcasts/:program_slug', {
            templateUrl: 'js/app/views/podcasts-list.html',
            controller: 'PodcastsProgramCtrl'
        })
        .when('/podcasts/:program_slug/:id', {
            templateUrl: 'js/app/views/podcast.html',
            controller: 'PodcastCtrl'
        })
        .when('/schedule', {
            templateUrl: 'js/app/views/schedule.html',
            controller: 'ScheduleCtrl'
        })
        .when('/songs', {
            templateUrl: 'js/app/views/songs-list.html',
            controller: 'SongsCtrl'
        })
        .when('/songs/:slug', {
            templateUrl: 'js/app/views/song.html',
            controller: 'SongCtrl'
        })
        .when('/songs/genre/:slug', {
            templateUrl: 'js/app/views/songs-list.html',
            controller: 'SongsGenreCtrl'
        })
        .when('/songs/tag/:slug', {
            templateUrl: 'js/app/views/songs-list.html',
            controller: 'SongsTagCtrl'
        })
        .when('/tags/:slug', {
            templateUrl: 'js/app/views/news-list.html',
            controller: 'TagsCtrl'
        })
        .when('/login', {
            templateUrl: 'js/app/views/login.html',
            controller: 'LoginCtrl'
        })
        .when('/search', {
            templateUrl: 'js/app/views/search.html',
            controller: 'SearchCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});
