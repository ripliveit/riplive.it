'use strict';

describe('Service: EngineIo', function () {

  // load the service's module
  beforeEach(module('riplive'));

  // instantiate service
  var EngineIo;
  beforeEach(inject(function (_EngineIo_) {
    EngineIo = _EngineIo_;
  }));

  it('should do something', function () {
    expect(!!EngineIo).toBe(true);
  });

});
