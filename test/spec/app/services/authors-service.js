'use strict';

describe('Service: AuthorsService', function () {

  // load the service's module
  beforeEach(module('riplive'));

  // instantiate service
  var AuthorsService;
  beforeEach(inject(function (_AuthorsService_) {
    AuthorsService = _AuthorsService_;
  }));

  it('should do something', function () {
    expect(!!AuthorsService).toBe(true);
  });

});
