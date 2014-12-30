'use strict';

describe('Controller: OnairCtrl', function () {

  // load the controller's module
  beforeEach(module('riplive'));

  var OnairCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OnairCtrl = $controller('OnairCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
