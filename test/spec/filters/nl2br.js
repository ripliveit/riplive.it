'use strict';

describe('Filter: nl2br', function () {

  // load the filter's module
  beforeEach(module('riplive'));

  // initialize a new instance of the filter before each test
  var nl2br;
  beforeEach(inject(function ($filter) {
    nl2br = $filter('nl2br');
  }));

  it('should return the input prefixed with "nl2br filter:"', function () {
    var text = 'angularjs';
    expect(nl2br(text)).toBe('nl2br filter: ' + text);
  });

});
