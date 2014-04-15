'use strict';

describe('Service: NewsService', function () {

  // load the service's module
  beforeEach(module('riplive'));

  // instantiate service
  var NewsService;
  beforeEach(inject(function (_NewsService_) {
    NewsService = _NewsService_;
  }));

  it('should do something', function () {
    expect(!!NewsService).toBe(true);
  });

});
