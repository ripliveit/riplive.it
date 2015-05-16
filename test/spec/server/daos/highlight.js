var expect       = require('expect.js');
var sinon        = require('sinon');
var config       = require('config');
var memcached    = require(process.cwd() + '/server/services/memcached-client.js');
var HttpService  = require(process.cwd() + '/server/services/http-service.js');
var hasher       = require(process.cwd() + '/server/services/hasher.js');
var Broker       = require(process.cwd() + '/server/services/memcached-broker.js');
var HighlightDao = require(process.cwd() + '/server/daos/highlight.js');
var broker       = new Broker(memcached, HttpService);
var highlightDao = new HighlightDao(config, hasher, broker);

describe('HighlightDao', function() {
    beforeEach(function() {
        sinon.stub(memcached, 'get', function(key, cb) {
            return cb(null, false);
        });

        sinon.stub(memcached, 'set', function(key, value, lifetime, cb) {
            return cb(null, value);
        });

        sinon.stub(broker, 'set', function(key, body, cb) {
            return cb(null, body);
        });
    });

    afterEach(function() {
        memcached.get.restore();
        memcached.set.restore();
        broker.set.restore();
    });

    it('is an object used to retrieve artist\'s information from remote endpoint', function() {
        expect(highlightDao).to.be.an('object');
        expect(highlightDao).to.have.property('getHighlights');
    });

    describe('#getHighlights', function() {
        this.timeout(15000);

        it('should return an array of highlights', function(done) {
            var criteria = {
                count : 6,
                page: 1
            };

            highlightDao.getHighlights(criteria, function(err, data) {
                if (err) throw err;

                var data = JSON.parse(data);

                expect(data).to.be.an('object');
                expect(data.status).to.be('ok');
                expect(data.highlights).to.be.an('object');
                expect(data.highlights.length).to.be.equal(data.count);
                
                done();
            });
        });
    });
});
