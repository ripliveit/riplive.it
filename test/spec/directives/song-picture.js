'use strict';

describe('Directive: songPicture', function () {

  // load the directive's module
  beforeEach(module('riplive'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<song-picture></song-picture>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the songPicture directive');
  }));
});
