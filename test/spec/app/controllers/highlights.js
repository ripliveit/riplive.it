'use strict';

describe('Controller: HighlightsCtrl', function () {

  // load the controller's module
  beforeEach(module('riplive'));

  var HighlightsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HighlightsCtrl = $controller('HighlightsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
