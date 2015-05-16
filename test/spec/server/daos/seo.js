var expect      = require('expect.js');
var sinon       = require('sinon');
var config      = require('config');
var memcached   = require(process.cwd() + '/server/services/memcached-client.js');
var HttpService = require(process.cwd() + '/server/services/http-service.js');
var hasher      = require(process.cwd() + '/server/services/hasher.js');
var Broker      = require(process.cwd() + '/server/services/memcached-broker.js');
var libxmljs    = require('libxmljs');
var SeoDao      = require(process.cwd() + '/server/daos/seo.js');
var broker      = new Broker(memcached, HttpService);
var seoDao = new SeoDao(config, hasher, broker);

describe('SeoDao', function() {   
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

    it('is an object used to retrieve author\'s information from remote endpoint', function() {
        expect(seoDao).to.be.an('object');
        expect(seoDao).to.have.property('getSiteMap');
        expect(seoDao).to.have.property('getMetaByPath');
    });

    describe('#getSiteMap', function() {
        this.timeout(15000);

        it('should return an xml string', function(done) {
            seoDao.getSiteMap(function(err, data) {
                if (err) throw err;

                var xmlDoc = libxmljs.parseXml(data);
                done();
            });
        });
    });

    describe('#getMetaByPath', function() {
        this.timeout(15000);

        it('should return an array of metatag', function(done) {
            var path = '/news/attimi-di-ordinaria-follia';

            seoDao.getMetaByPath(path, function(err, data) {
                if (err) throw err;

                expect(data).to.be.an('object');
                expect(data).to.have.property('path');
                expect(data.path).to.be.equal(path);

                done();
            });
        });
    });
});
