var expect      = require('expect.js');
var sinon       = require('sinon');
var config      = require('config');
var memcached   = require(process.cwd() + '/server/utils/memcached-client.js');
var HttpService = require(process.cwd() + '/server/utils/http.js');
var hasher      = require(process.cwd() + '/server/utils/hasher.js');
var Broker      = require(process.cwd() + '/server/utils/memcached-broker.js');
var SearchDao   = require(process.cwd() + '/server/daos/search.js');
var broker      = new Broker(memcached, HttpService);
var searchDao = new SearchDao(config, hasher, broker);

describe('SearchDao', function() {
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

    it('is an object used to search against a remote endpoint', function() {
        expect(searchDao).to.be.an('object');
        expect(searchDao).to.have.property('getSearchResults');
    });

    describe('#getSearchResults', function() {
        this.timeout(15000);

        it('should return an array of data', function(done) {
            var criteria = {
                search : 'free mama',
                type : 'artists',
                count: 1
            };

            searchDao.getSearchResults(criteria, function(err, data) {
                if (err) throw err;

                var data = JSON.parse(data);

                expect(data).to.be.an('object');
                expect(data.status).to.be('ok');
                expect(data.posts).to.be.an('array');
                expect(data.posts[0].type).to.be.equal(criteria.type);
                expect(data.posts.length).to.be.equal(criteria.count);
                
                done();
            });
        });
    });
});
