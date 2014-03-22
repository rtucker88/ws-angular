'use strict';

describe('Service: Chatservice', function () {

  // load the service's module
  beforeEach(module('wsAngularDemoApp'));

  // instantiate service
  var Chatservice;
  beforeEach(inject(function (_Chatservice_) {
    Chatservice = _Chatservice_;
  }));

  it('should do something', function () {
    expect(!!Chatservice).toBe(true);
  });

});
