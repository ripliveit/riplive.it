'use strict';

describe('Controller: SongsTagCtrl', function () {

  // load the controller's module
  beforeEach(module('riplive'));

  var SongsTagCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SongsTagCtrl = $controller('SongsTagCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
