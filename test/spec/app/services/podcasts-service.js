'use strict';

describe('Service: PodcastsService', function () {

  // load the service's module
  beforeEach(module('riplive'));

  // instantiate service
  var PodcastsService;
  beforeEach(inject(function (_PodcastsService_) {
    PodcastsService = _PodcastsService_;
  }));

  it('should do something', function () {
    expect(!!PodcastsService).toBe(true);
  });

});
