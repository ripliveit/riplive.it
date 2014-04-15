'use strict';

describe('Service: ChartsService', function () {

  // load the service's module
  beforeEach(module('riplive'));

  // instantiate service
  var ChartsService;
  beforeEach(inject(function (_ChartsService_) {
    ChartsService = _ChartsService_;
  }));

  it('should do something', function () {
    expect(!!ChartsService).toBe(true);
  });

});
