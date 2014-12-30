'use strict';

describe('Service: AudioService', function () {

  // load the service's module
  beforeEach(module('riplive'));

  // instantiate service
  var AudioService;
  beforeEach(inject(function (_AudioService_) {
    AudioService = _AudioService_;
  }));

  it('should do something', function () {
    expect(!!AudioService).toBe(true);
  });

});
