'use strict';

describe('Service: ProgramsService', function () {

  // load the service's module
  beforeEach(module('riplive'));

  // instantiate service
  var ProgramsService;
  beforeEach(inject(function (_ProgramsService_) {
    ProgramsService = _ProgramsService_;
  }));

  it('should do something', function () {
    expect(!!ProgramsService).toBe(true);
  });

});
