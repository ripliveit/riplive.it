'use strict';

angular.module('riplive')

/**
 * An experimental directive that show a map
 * with placeholders, one for each ACME program's episode.
 * 
 * @param  {Object} podcastsService) 
 * @return {Object}
 */
.directive('map', function(podcastsService) {
    return {
        template: '<div id="map"></div>',
        restrict: 'E',
        replace: 'true',
        scope: {
            data: '='
        },
        link: function postLink(scope, element, attrs) {
            var orange = '#f8941e';
            var gray   = '#082927';
            var slug   = 'acme';

            L.mapbox.accessToken = 'pk.eyJ1IjoiZ2FicmllbGVkYXJyaWdvIiwiYSI6IkhWQVZzLWsifQ.4sekvn85uvtS4PE0tSWxrw';
            var map = L.mapbox.map('map', 'mapbox.streets')
            					.setView([45.5691487, 8.9171523], 15);


            var openPopUp = function(e, d) {
                var content = '';

                if (d.podcast.id === null) {
                    content += '<p>';
                    content += '<a href="/authors/fede" title="La Fede">La Fede</a>';
                    content += ' e ';
                    content += '<a href="/authors/dottoressa-cri" title="La CRI">La CRI</a>';
                    content += ' non hanno ancora conquistato ';
                    content += d.address + '!</p>';

                    return L.popup().setLatLng(e.latlng)
                                    .setContent(content)
                                    .openOn(map);
                }

                podcastsService.getPodcast(slug, d.podcast.id, function(item) {
                    content += '<h2 class="pop-up-title">';
                    content += '<a href="http://www.riplive.it/' + slug + '/' + item.id + '" title="' + item.title +'">' + item.title + '</a>';
                    content += '</h2>';
                    content += '<iframe src="/static/player.html?podcast=' + item.url + '" width="245" height="140" frameborder="0" style="margin: 0 auto; display: block"></iframe>';
                    content += '<p>' + item.summary + '</p>';

                    L.popup().setLatLng(e.latlng)
                        .setContent(content)
                        .openOn(map);
                });
            };

            var drawMarkers = function(data) {
                if (typeof data === 'undefined') {
                    return false;
                }

                data.forEach(function(d) {
                    var m = L.marker([d.coords[0], d.coords[1]], {
                        icon: L.mapbox.marker.icon({
                            'marker-size': 'medium',
					        'marker-symbol': 'polling-place',
					        'marker-color': d.checked === true ? orange : gray
                        })
                    })
                    .addTo(map)
                    .on('click', function(e) {
                        return openPopUp(e, d);
                    });
                });
            };

            scope.$watch('data', drawMarkers);
        }
    };
});
