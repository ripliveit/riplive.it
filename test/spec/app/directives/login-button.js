'use strict';

describe('Directive: loginButton', function () {

  // load the directive's module
  beforeEach(module('riplive'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<login-button></login-button>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the loginButton directive');
  }));
});
