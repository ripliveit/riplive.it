'use strict';

describe('Directive: photosControl', function () {

  // load the directive's module
  beforeEach(module('ripliveApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<photos-control></photos-control>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the photosControl directive');
  }));
});
