'use strict';

describe('Service: SongsService', function () {

  // load the service's module
  beforeEach(module('riplive'));

  // instantiate service
  var SongsService;
  beforeEach(inject(function (_SongsService_) {
    SongsService = _SongsService_;
  }));

  it('should do something', function () {
    expect(!!SongsService).toBe(true);
  });

});
