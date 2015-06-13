var expect      = require('expect.js');
var sinon       = require('sinon');
var config      = require('config');
var memcached   = require(process.cwd() + '/server/services/memcached-client.js');
var HttpService = require(process.cwd() + '/server/services/http-service.js');
var hasher      = require(process.cwd() + '/server/services/hasher.js');
var Broker      = require(process.cwd() + '/server/services/memcached-broker.js');
var NewsDao     = require(process.cwd() + '/server/daos/news.js');
var broker      = new Broker(memcached, HttpService);
var newsDao = new NewsDao(config, hasher, broker);

describe('NewsDao', function() {
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
        expect(newsDao).to.be.an('object');
        expect(newsDao).to.have.property('getNewsBySlug');
        expect(newsDao).to.have.property('getAllNews');
        expect(newsDao).to.have.property('getNewsByCategory');
        expect(newsDao).to.have.property('getNewsByTag');
    });

    describe('#getNewsBySlug', function() {
        this.timeout(15000);

        it('should return a single news object', function(done) {
            var slug = 'izombie';

            newsDao.getNewsBySlug(slug, function(err, data) {
                if (err) throw err;

                var data = JSON.parse(data);

                expect(data).to.be.an('object');
                expect(data.status).to.be('ok');
                expect(data.post).to.be.an('object');
                expect(data.post.slug).to.be.equal(slug);
                done();
            });
        });
    });

    describe('#getAllNews', function() {
        this.timeout(15000);

        it('should return an array of news', function(done) {
            var criteria = {
                count: 24,
                page: 1
            };

            newsDao.getAllNews(criteria, function(err, data) {
                if (err) throw err;

                var data = JSON.parse(data);

                expect(data).to.be.an('object');
                expect(data.status).to.be('ok');
                expect(data.posts).to.be.an('array');
                expect(data.count).to.be.equal(data.posts.length);
                done();
            });
        });
    });

    describe('#getNewsByCategory', function() {
        this.timeout(15000);

        it('should return all news within a particular category', function(done) {
            var slug = 'cinema';
            var criteria = {
                count: 24,
                page: 1
            };

            newsDao.getNewsByCategory(slug, criteria, function(err, data) {
                if (err) throw err;

                var data = JSON.parse(data);

                expect(data).to.be.an('object');
                expect(data.status).to.be('ok');
                expect(data.posts).to.be.an('array');
                expect(data.count).to.be.equal(data.posts.length);
                done();
            });
        });
    });

    describe('#getNewsByTag', function() {
        this.timeout(15000);

        it('should return all news within a specific tag', function(done) {
            var slug = 'halloween';
            var criteria = {
                count: 24,
                page: 1
            };

            newsDao.getNewsByTag(slug, criteria, function(err, data) {
                if (err) throw err;

                var data = JSON.parse(data);

                expect(data).to.be.an('object');
                expect(data.status).to.be('ok');
                expect(data.posts).to.be.an('array');
                expect(data.count).to.be.equal(data.posts.length);
                done();
            });
        });
    });
});
