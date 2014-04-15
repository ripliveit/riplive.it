'use strict';

describe('Controller: SongCtrl', function () {

  // load the controller's module
  beforeEach(module('riplive'));

  var SongCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SongCtrl = $controller('SongCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
