'use strict';

describe('Service: TagsService', function () {

  // load the service's module
  beforeEach(module('riplive'));

  // instantiate service
  var TagsService;
  beforeEach(inject(function (_TagsService_) {
    TagsService = _TagsService_;
  }));

  it('should do something', function () {
    expect(!!TagsService).toBe(true);
  });

});
