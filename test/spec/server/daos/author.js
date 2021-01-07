var expect      = require('expect.js');
var sinon       = require('sinon');
var config      = require('config');
var memcached   = require(process.cwd() + '/server/services/memcached-client.js');
var HttpService = require(process.cwd() + '/server/services/http-service.js');
var hasher      = require(process.cwd() + '/server/services/hasher.js');
var Broker      = require(process.cwd() + '/server/services/memcached-broker.js');
var AuthorDao   = require(process.cwd() + '/server/daos/author.js');
var broker      = new Broker(memcached, HttpService);
var authorDao = new AuthorDao(config, hasher, broker);

describe('AuthorDao', function() {
    beforeEach(function() {
        sinon.stub(memcached, 'get').callsFake(function(key, cb) {
            return cb(null, false);
        });

        sinon.stub(memcached, 'set').callsFake(function(key, value, lifetime, cb) {
            return cb(null, value);
        });

        sinon.stub(broker, 'set').callsFake(function(key, body, cb) {
            return cb(null, body);
        });
    });

    afterEach(function() {
        memcached.get.restore();
        memcached.set.restore();
        broker.set.restore();
    });

    it('is an object used to retrieve author\'s information from remote endpoint', function() {
        expect(authorDao).to.be.an('object');
        expect(authorDao).to.have.property('getAuthorBySlug');
        expect(authorDao).to.have.property('getAllAuthors');
    });

    describe('#getAuthorBySlug', function() {
        this.timeout(15000);
        
        it('should return a single author object', function(done) {
            var slug = 'ilfratus';

            authorDao.getAuthorBySlug(slug, function(err, data) {
                if (err) throw err;

                var data = JSON.parse(data);

                expect(data).to.be.an('object');
                expect(data.status).to.be('ok');
                expect(data.author).to.be.an('object');
                expect(data.author.slug).to.be.equal(slug);
                done();
            });
        });
    });

    describe('#getAllAuthors', function() {
        this.timeout(15000);

        it('should return an array of authors', function(done) {
            var criteria = {
                page: 1
            };

            authorDao.getAllAuthors(criteria, function(err, data) {
                if (err) throw err;

                var data = JSON.parse(data);

                expect(data).to.be.an('object');
                expect(data.status).to.be('ok');
                expect(data.authors).to.be.an('array');
                expect(data.count).to.be.equal(data.authors.length);
                done();
            });
        });
    });
});
