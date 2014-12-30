'use strict';

describe('Service: VoteService', function () {

  // load the service's module
  beforeEach(module('ripliveApp'));

  // instantiate service
  var VoteService;
  beforeEach(inject(function (_VoteService_) {
    VoteService = _VoteService_;
  }));

  it('should do something', function () {
    expect(!!VoteService).toBe(true);
  });

});
