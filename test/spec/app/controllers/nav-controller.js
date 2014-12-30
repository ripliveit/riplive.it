'use strict';

describe('Controller: NavControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('riplive'));

  var NavControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NavControllerCtrl = $controller('NavControllerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
