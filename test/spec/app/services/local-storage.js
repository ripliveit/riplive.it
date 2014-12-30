'use strict';

describe('Service: LocalStorage', function () {

  // load the service's module
  beforeEach(module('riplive'));

  // instantiate service
  var LocalStorage;
  beforeEach(inject(function (_LocalStorage_) {
    LocalStorage = _LocalStorage_;
  }));

  it('should do something', function () {
    expect(!!LocalStorage).toBe(true);
  });

});
