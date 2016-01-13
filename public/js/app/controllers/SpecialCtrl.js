'use strict';

angular.module('riplive')

.controller('SpecialCtrl', function SpecialCtrl($scope, podcastsService, generalService) {
	generalService.getAcmeGeoData(function(data) {
		$scope.data = data;
	});
});
