'use strict';

describe('Controller: ProgramCtrl', function () {

  // load the controller's module
  beforeEach(module('riplive'));

  var ProgramCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProgramCtrl = $controller('ProgramCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
