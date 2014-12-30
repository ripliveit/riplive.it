'use strict';

describe('Service: programSchedule', function () {

  // load the service's module
  beforeEach(module('riplive'));

  // instantiate service
  var programSchedule;
  beforeEach(inject(function (_programSchedule_) {
    programSchedule = _programSchedule_;
  }));

  it('should do something', function () {
    expect(!!programSchedule).toBe(true);
  });

});
