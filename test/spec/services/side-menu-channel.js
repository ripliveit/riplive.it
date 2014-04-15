'use strict';

describe('Service: SideMenuChannel', function () {

  // load the service's module
  beforeEach(module('riplive'));

  // instantiate service
  var SideMenuChannel;
  beforeEach(inject(function (_SideMenuChannel_) {
    SideMenuChannel = _SideMenuChannel_;
  }));

  it('should do something', function () {
    expect(!!SideMenuChannel).toBe(true);
  });

});
