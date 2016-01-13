'use strict';

angular.module('riplive')

/**
 * Retrieve ACME geodata
 * to show a map filled with placeholders, one for each 
 * entries ACME podcast.
 * 
 * @param {Object} $scope
 * @param {Object} generalService
 */
.controller('SpecialCtrl', function SpecialCtrl($scope, generalService) {
	generalService.getAcmeGeoData(function(data) {
		$scope.data = data;
	});
});
