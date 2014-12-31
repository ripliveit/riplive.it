var expect = require('expect.js');
var memcached = require(process.cwd() + '/server/services/memcached-client.js');

describe('Memcached', function() {
    it('is an object used to connect to a memcached server', function() {
    	var config = {
		    poolSize: 20,
		    retries: 5,
		    failures: 5,
		    keyCompression: false
		};

        expect(memcached).to.be.an('object');
        expect(memcached).to.have.property('servers');
        expect(memcached.servers).to.be.an('array');

        expect(memcached).to.have.property('poolSize');
        expect(memcached.poolSize).to.be.equal(config.poolSize);

        expect(memcached).to.have.property('retries');
        expect(memcached.retries).to.be.equal(config.retries);

        expect(memcached).to.have.property('failures');
        expect(memcached.failures).to.be.equal(config.failures);

        expect(memcached).to.have.property('keyCompression');
        expect(memcached.keyCompression).to.be.equal(config.keyCompression);
    });
});
