'use strict';

describe('Service: ScheduleService', function () {

  // load the service's module
  beforeEach(module('riplive'));

  // instantiate service
  var ScheduleService;
  beforeEach(inject(function (_ScheduleService_) {
    ScheduleService = _ScheduleService_;
  }));

  it('should do something', function () {
    expect(!!ScheduleService).toBe(true);
  });

});
