'use strict';

describe('Service: Audio', function () {

  // load the service's module
  beforeEach(module('riplive'));

  // instantiate service
  var Audio;
  beforeEach(inject(function (_Audio_) {
    Audio = _Audio_;
  }));

  it('should do something', function () {
    expect(!!Audio).toBe(true);
  });

});
