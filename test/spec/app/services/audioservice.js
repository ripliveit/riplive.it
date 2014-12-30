'use strict';

describe('Service: Audioservice', function () {

  // load the service's module
  beforeEach(module('riplive'));

  // instantiate service
  var Audioservice;
  beforeEach(inject(function (_Audioservice_) {
    Audioservice = _Audioservice_;
  }));

  it('should do something', function () {
    expect(!!Audioservice).toBe(true);
  });

});
