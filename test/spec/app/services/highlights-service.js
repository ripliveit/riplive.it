'use strict';

describe('Service: HighlightsService', function () {

  // load the service's module
  beforeEach(module('riplive'));

  // instantiate service
  var HighlightsService;
  beforeEach(inject(function (_HighlightsService_) {
    HighlightsService = _HighlightsService_;
  }));

  it('should do something', function () {
    expect(!!HighlightsService).toBe(true);
  });

});
