'use strict';

describe('Directive: streamingPlayer', function () {

  // load the directive's module
  beforeEach(module('riplive'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<streaming-player></streaming-player>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the streamingPlayer directive');
  }));
});
