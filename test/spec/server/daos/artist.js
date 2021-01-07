var expect      = require('expect.js');
var sinon       = require('sinon');
var config      = require('config');
var memcached   = require(process.cwd() + '/server/services/memcached-client.js');
var HttpService = require(process.cwd() + '/server/services/http-service.js');
var hasher      = require(process.cwd() + '/server/services/hasher.js');
var Broker      = require(process.cwd() + '/server/services/memcached-broker.js');
var ArtistDao   = require(process.cwd() + '/server/daos/artist.js');
var broker      = new Broker(memcached, HttpService);
var artistDao   = new ArtistDao(config, hasher, broker);

describe('ArtistDao', function() {
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

    it('is an object used to retrieve artist\'s information from remote endpoint', function() {
        expect(artistDao).to.be.an('object');
        expect(artistDao).to.have.property('getArtistBySlug');
        expect(artistDao).to.have.property('getAllArtists');
        expect(artistDao).to.have.property('getArtistsByGenre');
        expect(artistDao).to.have.property('getArtistsByTag');
        expect(artistDao).to.have.property('getArtistsGenres');
    });

    describe('#getArtistBySlug', function() {
        this.timeout(15000);

        it('should return a single artist object', function(done) {
            var slug = 'adele-e-il-mare';

            artistDao.getArtistBySlug(slug, function(err, data) {
                if (err) throw err;

                var data = JSON.parse(data);

                expect(data).to.be.an('object');
                expect(data.status).to.be('ok');
                expect(data.artist).to.be.an('object');
                expect(data.artist.artist_slug).to.be.equal(slug);
                done();
            });
        });
    });

    describe('#getAllArtists', function() {
        this.timeout(15000);

        it('should return an array of artists', function(done) {
            var criteria = {
                count: 24,
                page: 1
            };

            artistDao.getAllArtists(criteria, function(err, data) {
                if (err) throw err;

                var data = JSON.parse(data);

                expect(data).to.be.an('object');
                expect(data.status).to.be('ok');
                expect(data.artists).to.be.an('array');
                expect(data.count).to.be.equal(data.artists.length);
                done();
            });
        });
    });

    describe('#getArtistsByGenre', function() {
        this.timeout(15000);

        it('should return all artists within a particular genre', function(done) {
            var slug = 'rock';
            var criteria = {
                count: 24,
                page: 1
            };

            artistDao.getArtistsByGenre(slug, criteria, function(err, data) {
                if (err) throw err;

                var data = JSON.parse(data);

                expect(data).to.be.an('object');
                expect(data.status).to.be('ok');
                expect(data.artists).to.be.an('array');
                expect(data.count).to.be.equal(data.artists.length);
                done();
            });
        });
    });

    describe('#getArtistsByTag', function() {
        this.timeout(15000);

        it('should return all artists within a specific tag', function(done) {
            var slug = 'pop';
            var criteria = {
                count: 24,
                page: 1
            };

            artistDao.getArtistsByTag(slug, criteria, function(err, data) {
                if (err) throw err;

                var data = JSON.parse(data);

                expect(data).to.be.an('object');
                expect(data.status).to.be('ok');
                expect(data.artists).to.be.an('array');
                expect(data.count).to.be.equal(data.artists.length);
                done();
            });
        });
    });

    describe('#getArtistsGenres', function() {
        this.timeout(15000);

        it('should return all artists genres', function(done) {
            artistDao.getArtistsGenres(function(err, data) {
                if (err) throw err;

                var data = JSON.parse(data);

                expect(data).to.be.an('object');
                expect(data.status).to.be('ok');
                expect(data.genres).to.be.an('array');
                expect(data.count).to.be.equal(data.genres.length);
                done();
            });
        });
    });
});
