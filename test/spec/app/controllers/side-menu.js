'use strict';

describe('Controller: SideMenuCtrl', function () {

  // load the controller's module
  beforeEach(module('riplive'));

  var SideMenuCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SideMenuCtrl = $controller('SideMenuCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
