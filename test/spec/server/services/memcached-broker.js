var expect      = require('expect.js');
var sinon       = require('sinon');
var memcached   = require(process.cwd() + '/server/services/memcached-client.js');
var HttpService = require(process.cwd() + '/server/services/http-service.js');
var hasher      = require(process.cwd() + '/server/services/hasher.js');
var Broker      = require(process.cwd() + '/server/services/memcached-broker.js');
var broker      = new Broker(memcached, HttpService);
var fakeKey     = 'key';
var fakeValue   = 'this.is.a.value';

describe('MemcachedBroker', function() {
    beforeEach(function() {
        sinon.stub(memcached, 'get', function(key, cb) {
            return cb(null, false);
        });

        sinon.stub(memcached, 'set', function(key, value, lifetime, cb) {
            return cb(null, value);
        });
    });

    afterEach(function() {
        memcached.get.restore();
        memcached.set.restore();
    });

    it('is an object used to persists and cache data into a memcached server instance' +
        'or to retrieve data from a remote endpoint ',
        function() {
            expect(broker).to.be.an('object');
            expect(broker).to.have.property('setTime');
            expect(broker).to.have.property('getTime');
            expect(broker).to.have.property('set');
            expect(broker).to.have.property('get');

            describe('#setTime', function() {
                it('should set the default caching lifetime of the broker', function() {
                    broker.setTime(60);
                    var time = broker.getTime();

                    expect(time).to.be.equal(60);
                });
            });

            describe('#getTime', function() {
                it('should return the default caching time of the broker', function() {
                    var defaultTime = broker.getTime();
                    expect(defaultTime).to.be.equal(60);
                });
            });

            describe('#set', function() {
                it('should set a value into memcached', function(done) {

                    broker.set(fakeKey, fakeValue, function(err, res) {
                        if (err) throw err;

                        expect(res).to.be.equal(fakeValue);
                        done();
                    });
                });
            });

            describe('#get', function() {
                it('should return data from memcached or from a remote endpoint (if passed as arguments)',
                    function(done) {
                        broker.get(fakeKey, null, function(err, res) {
                            if (err) throw err;

                            expect(res).to.be.equal(fakeValue);
                            done();
                        });
                    });
            });
        });
});