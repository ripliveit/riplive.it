'use strict';

describe('Service: OnAirChannel', function () {

  // load the service's module
  beforeEach(module('riplive'));

  // instantiate service
  var OnAirChannel;
  beforeEach(inject(function (_OnAirChannel_) {
    OnAirChannel = _OnAirChannel_;
  }));

  it('should do something', function () {
    expect(!!OnAirChannel).toBe(true);
  });

});
