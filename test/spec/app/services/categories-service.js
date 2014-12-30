'use strict';

describe('Service: CategoriesService', function () {

  // load the service's module
  beforeEach(module('riplive'));

  // instantiate service
  var CategoriesService;
  beforeEach(inject(function (_CategoriesService_) {
    CategoriesService = _CategoriesService_;
  }));

  it('should do something', function () {
    expect(!!CategoriesService).toBe(true);
  });

});
