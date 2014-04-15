'use strict';

describe('Controller: ArtistCtrl', function () {

  // load the controller's module
  beforeEach(module('ripliveApp'));

  var ArtistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArtistCtrl = $controller('ArtistCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
