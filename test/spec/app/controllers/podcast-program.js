'use strict';

describe('Controller: PodcastProgramCtrl', function () {

  // load the controller's module
  beforeEach(module('ripliveApp'));

  var PodcastProgramCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PodcastProgramCtrl = $controller('PodcastProgramCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
