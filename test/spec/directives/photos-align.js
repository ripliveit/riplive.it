'use strict';

describe('Directive: photosAlign', function () {

  // load the directive's module
  beforeEach(module('ripliveApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<photos-align></photos-align>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the photosAlign directive');
  }));
});
