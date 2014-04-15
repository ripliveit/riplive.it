'use strict';

describe('Controller: AuthorsCtrl', function () {

  // load the controller's module
  beforeEach(module('riplive'));

  var AuthorsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuthorsCtrl = $controller('AuthorsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
