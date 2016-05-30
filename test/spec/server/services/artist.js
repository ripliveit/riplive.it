let expect = require('expect.js');
let sinon = require('sinon');
let artist = require('../../server/services/artist');

describe('ArtistServices', function () {
    let sandbox, brokerFn;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        sinon.stub(broker, 'set', function (key, body, cb) {
            return cb(null, body);
        });

        http.__set__('request', {
            get: getFn,
            post: postFn
        });
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('is an object used to retrieve artist\'s information from remote endpoint', function () {
        expect(artist).to.be.an('object');
        expect(artist).to.have.property('getArtistBySlug');
        expect(artist).to.have.property('getAllArtists');
        expect(artist).to.have.property('getArtistsByGenre');
        expect(artist).to.have.property('getArtistsByTag');
        expect(artist).to.have.property('getArtistsGenres');
    });

    describe('#getArtistBySlug', function () {
        this.timeout(15000);

        it('should return a single artist object', function (done) {
            var slug = 'adele-e-il-mare';

            artistDao.getArtistBySlug(slug, function (err, data) {
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

    describe('#getAllArtists', function () {
        this.timeout(15000);

        it('should return an array of artists', function (done) {
            var criteria = {
                count: 24,
                page: 1
            };

            artistDao.getAllArtists(criteria, function (err, data) {
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

    describe('#getArtistsByGenre', function () {
        this.timeout(15000);

        it('should return all artists within a particular genre', function (done) {
            var slug = 'rock';
            var criteria = {
                count: 24,
                page: 1
            };

            artistDao.getArtistsByGenre(slug, criteria, function (err, data) {
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

    describe('#getArtistsByTag', function () {
        this.timeout(15000);

        it('should return all artists within a specific tag', function (done) {
            var slug = 'pop';
            var criteria = {
                count: 24,
                page: 1
            };

            artistDao.getArtistsByTag(slug, criteria, function (err, data) {
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

    describe('#getArtistsGenres', function () {
        this.timeout(15000);

        it('should return all artists genres', function (done) {
            artistDao.getArtistsGenres(function (err, data) {
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
