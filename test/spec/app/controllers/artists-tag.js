'use strict';

describe('Controller: ArtistsTagCtrl', function () {

  // load the controller's module
  beforeEach(module('ripliveApp'));

  var ArtistsTagCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArtistsTagCtrl = $controller('ArtistsTagCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
