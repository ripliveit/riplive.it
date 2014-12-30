'use strict';

describe('Service: GeneralService', function () {

  // load the service's module
  beforeEach(module('riplive'));

  // instantiate service
  var GeneralService;
  beforeEach(inject(function (_GeneralService_) {
    GeneralService = _GeneralService_;
  }));

  it('should do something', function () {
    expect(!!GeneralService).toBe(true);
  });

});
