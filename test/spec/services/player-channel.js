'use strict';

describe('Service: PlayerChannel', function () {

  // load the service's module
  beforeEach(module('riplive'));

  // instantiate service
  var PlayerChannel;
  beforeEach(inject(function (_PlayerChannel_) {
    PlayerChannel = _PlayerChannel_;
  }));

  it('should do something', function () {
    expect(!!PlayerChannel).toBe(true);
  });

});
