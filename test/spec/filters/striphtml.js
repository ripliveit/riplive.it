'use strict';

describe('Filter: stripHtml', function () {

  // load the filter's module
  beforeEach(module('ripliveApp'));

  // initialize a new instance of the filter before each test
  var stripHtml;
  beforeEach(inject(function ($filter) {
    stripHtml = $filter('stripHtml');
  }));

  it('should return the input prefixed with "stripHtml filter:"', function () {
    var text = 'angularjs';
    expect(stripHtml(text)).toBe('stripHtml filter: ' + text);
  });

});
