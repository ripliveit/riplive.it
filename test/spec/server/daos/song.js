var expect      = require('expect.js');
var sinon       = require('sinon');
var config      = require('config');
var memcached   = require(process.cwd() + '/server/services/memcached-client.js');
var HttpService = require(process.cwd() + '/server/services/http-service.js');
var hasher      = require(process.cwd() + '/server/services/hasher.js');
var Broker      = require(process.cwd() + '/server/services/memcached-broker.js');
var SongDao     = require(process.cwd() + '/server/daos/song.js');
var broker      = new Broker(memcached, HttpService);
var songDao = new SongDao(config, hasher, broker);

describe('SongDao', function() {
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

    it('is an object used to retrieve song information from remote endpoint', function() {
        expect(songDao).to.be.an('object');
        expect(songDao).to.have.property('getSongBySlug');
        expect(songDao).to.have.property('getAllSongs');
        expect(songDao).to.have.property('getSongsByGenre');
        expect(songDao).to.have.property('getSongsByTag');
        expect(songDao).to.have.property('getSongsGenres');
    });

    describe('#getSongBySlug', function() {
        this.timeout(15000);

        it('should return a single program object', function(done) {
            var slug = 'addicted-to-you';

            songDao.getSongBySlug(slug, function(err, data) {
                if (err) throw err;

                var data = JSON.parse(data);

                expect(data).to.be.an('object');
                expect(data.status).to.be('ok');
                expect(data.song).to.be.an('object');
                expect(data.song.song_slug).to.be.equal(slug);
                done();
            });
        });
    });

    describe('#getAllSongs', function() {
        this.timeout(15000);

        it('should return an array of songs', function(done) {
            var criteria = {
                count: 24,
                page: 1
            };

            songDao.getAllSongs(criteria, function(err, data) {
                if (err) throw err;

                var data = JSON.parse(data);

                expect(data).to.be.an('object');
                expect(data.status).to.be('ok');
                expect(data.songs).to.be.an('array');
                expect(data.count).to.be.equal(data.songs.length);
                done();
            });
        });
    });

    describe('#getSongsByGenre', function() {
        this.timeout(15000);

        it('should return all songs within a specific genre', function(done) {
            var slug = 'rock';
            var criteria = {
                count: 24,
                page: 1
            };

            songDao.getSongsByGenre(slug, criteria, function(err, data) {
                if (err) throw err;

                var data = JSON.parse(data);

                expect(data).to.be.an('object');
                expect(data.status).to.be('ok');
                expect(data.songs).to.be.an('array');
                expect(data.count).to.be.equal(data.songs.length);
                done();
            });
        });
    });

    describe('#getSongsByTag', function() {
        this.timeout(15000);

        it('should return all songs within a specific genre', function(done) {
            var slug = 'hip-hop';
            var criteria = {
                count: 24,
                page: 1
            };

            songDao.getSongsByTag(slug, criteria, function(err, data) {
                if (err) throw err;

                var data = JSON.parse(data);

                expect(data).to.be.an('object');
                expect(data.status).to.be('ok');
                expect(data.songs).to.be.an('array');
                expect(data.count).to.be.equal(data.songs.length);
                done();
            });
        });
    });

    describe('#getSongsGenres', function() {
        this.timeout(15000);

        it('should return all songs genre', function(done) {
            var criteria = {
                count: 24,
                page: 1
            };

            songDao.getSongsGenres(function(err, data) {
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
