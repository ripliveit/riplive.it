'use strict';

describe('Controller: SongsCtrl', function () {

  // load the controller's module
  beforeEach(module('riplive'));

  var SongsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SongsCtrl = $controller('SongsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
