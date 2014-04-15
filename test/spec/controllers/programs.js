'use strict';

describe('Controller: ProgramsCtrl', function () {

  // load the controller's module
  beforeEach(module('riplive'));

  var ProgramsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProgramsCtrl = $controller('ProgramsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
