'use strict';

describe('Service: GenresService', function () {

  // load the service's module
  beforeEach(module('ripliveApp'));

  // instantiate service
  var GenresService;
  beforeEach(inject(function (_GenresService_) {
    GenresService = _GenresService_;
  }));

  it('should do something', function () {
    expect(!!GenresService).toBe(true);
  });

});
