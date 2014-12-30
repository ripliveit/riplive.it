var expect = require('expect.js');
var memcachedBroker = require(__dirname + '/../../services/memcached-broker.js');
var fakeKey = 'key';
var fakeValue = 'this.is.a.value';

describe('MemcachedBroker', function() {
    it('is an object used to persists and cache data into a memcached server instance' +
    	'or to retrieve data from a remote endpoint ', function() {

        expect(memcachedBroker).to.be.an('object');
        expect(memcachedBroker).to.have.property('setTime');
        expect(memcachedBroker).to.have.property('getTime');
        expect(memcachedBroker).to.have.property('set');
        expect(memcachedBroker).to.have.property('get');

        describe('#setTime', function() {
            it('should set the default caching lifetime of the broker', function() {
                var time = 60;

                memcachedBroker.setTime(60);
                var settedTime = memcachedBroker.getTime();

                expect(settedTime).to.be.equal(time);
            });
        });

        describe('#getTime', function() {
            it('should return the default caching time of the broker', function() {
                var defaultTime = memcachedBroker.getTime();
                expect(defaultTime).to.be.equal(60);
            });
        });

        describe('#set', function() {
            it('should set a value into memcached', function(done) {

                memcachedBroker.set(fakeKey, fakeValue, function(err, res) {
                    if (err) throw err;

                    expect(res).to.be.equal(fakeValue);
                    done();
                });
            });
        });

        describe('#get', function() {
            it('should return data from memcached or from a remote endpoint (if passed as arguments)', 
            	function(done) {
                memcachedBroker.get(fakeKey, null, function(err, res) {
                	if (err) throw err;

                	expect(res).to.be.equal(fakeValue);
                	done();
                });
            });
        });
    });
});