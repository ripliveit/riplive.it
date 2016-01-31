var expect      = require('expect.js');
var sinon       = require('sinon');
var config      = require('config');
var memcached   = require(process.cwd() + '/server/utils/memcached-client.js');
var HttpService = require(process.cwd() + '/server/utils/http.js');
var hasher      = require(process.cwd() + '/server/utils/hasher.js');
var Broker      = require(process.cwd() + '/server/utils/memcached-broker.js');
var PodcastDao  = require(process.cwd() + '/server/daos/podcast.js');
var broker      = new Broker(memcached, HttpService);
var podcastDao = new PodcastDao(config, hasher, broker);

describe('PodcastDao', function() {
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

    it('is an object used to retrieve podcasts information from remote endpoint', function() {
        expect(podcastDao).to.be.an('object');
        expect(podcastDao).to.have.property('getPodcastById');
        expect(podcastDao).to.have.property('getAllPodcasts');
        expect(podcastDao).to.have.property('getAllPodcastsByProgramSlug');
    });

    describe('#getPodcastById', function() {
        this.timeout(15000);

        it('should return a single podcast object', function(done) {
            var id = 798;

            podcastDao.getPodcastById(id, function(err, data) {
                if (err) throw err;

                var data = JSON.parse(data);

                expect(data).to.be.an('object');
                expect(data.status).to.be('ok');
                expect(data.podcast).to.be.an('object');
                expect(data.podcast.id).to.be.eql(id);
                done();
            });
        });
    });

    describe('#getAllPodcasts', function() {
        this.timeout(15000);

        it('should return an array of podcast', function(done) {
            var criteria = {
                count: 24,
                page: 1
            };

            podcastDao.getAllPodcasts(criteria, function(err, data) {
                if (err) throw err;

                var data = JSON.parse(data);

                expect(data).to.be.an('object');
                expect(data.status).to.be('ok');
                expect(data.podcasts).to.be.an('array');
                expect(data.count).to.be.equal(data.podcasts.length);
                done();
            });
        });
    });

    describe('#getAllPodcastsByProgramSlug', function() {
        this.timeout(15000);

        it('should return all podcasts within a specific programs', function(done) {
            var slug = 'to-the-club';
            var criteria = {
                count: 24,
                page: 1
            };

            podcastDao.getAllPodcastsByProgramSlug(slug, criteria, function(err, data) {
                if (err) throw err;

                var data = JSON.parse(data);

                expect(data).to.be.an('object');
                expect(data.status).to.be('ok');
                expect(data.podcasts).to.be.an('array');
                expect(data.count).to.be.equal(data.podcasts.length);
                done();
            });
        });
    });
});
