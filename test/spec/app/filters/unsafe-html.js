'use strict';

describe('Filter: unsafeHtml', function () {

  // load the filter's module
  beforeEach(module('riplive'));

  // initialize a new instance of the filter before each test
  var unsafeHtml;
  beforeEach(inject(function ($filter) {
    unsafeHtml = $filter('unsafeHtml');
  }));

  it('should return the input prefixed with "unsafeHtml filter:"', function () {
    var text = 'angularjs';
    expect(unsafeHtml(text)).toBe('unsafeHtml filter: ' + text);
  });

});
