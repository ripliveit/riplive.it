'use strict';

describe('Controller: PhotosCtrl', function () {

  // load the controller's module
  beforeEach(module('ripliveApp'));

  var PhotosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PhotosCtrl = $controller('PhotosCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
