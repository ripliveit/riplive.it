'use strict';

angular.module('riplive')
    .service('genresService', function genresService($injector) {
        var GenreSong = $injector.get('genreSong');

        return {
            getSongsGenres: function(cb) {
                var songGenres = GenreSong.list();
                songGenres.$promise.then(function(data) {
                    cb(data);
                });
            },
            getArtistsGenres: function(cb) {

            }
        };
    });
