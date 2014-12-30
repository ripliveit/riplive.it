'use strict';

describe('Controller: OnAirCtrl', function () {

  // load the controller's module
  beforeEach(module('riplive'));

  var OnAirCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OnAirCtrl = $controller('OnAirCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
