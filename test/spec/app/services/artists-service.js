'use strict';

describe('Service: ArtistsService', function () {

  // load the service's module
  beforeEach(module('ripliveApp'));

  // instantiate service
  var ArtistsService;
  beforeEach(inject(function (_ArtistsService_) {
    ArtistsService = _ArtistsService_;
  }));

  it('should do something', function () {
    expect(!!ArtistsService).toBe(true);
  });

});
