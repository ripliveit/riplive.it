'use strict';

describe('Service: Analytics', function () {

  // load the service's module
  beforeEach(module('ripliveApp'));

  // instantiate service
  var Analytics;
  beforeEach(inject(function (_Analytics_) {
    Analytics = _Analytics_;
  }));

  it('should do something', function () {
    expect(!!Analytics).toBe(true);
  });

});
