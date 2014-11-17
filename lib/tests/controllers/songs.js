var expect = require('expect.js');
var request = require('supertest');
var app = require(__dirname + '/../../../app.js')

describe('GET /api/songs', function() {
    this.timeout(5000);

    it('should return a JSON array of songs', function(done) {
        request(app)
            .get('/api/songs')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;

                expect(res).to.be.an('object');
                expect(res.body.status).to.be.equal('ok');
                expect(res.body.songs).to.be.an('array');
                expect(res.body.count).to.be.equal(res.body.songs.length);
                done();
            });
    });
});

describe('GET /api/songs/:slug', function() {
    this.timeout(5000);

    it('should return a single JSON news object', function(done) {
        var slug = 'a-ton-of-love';

        request(app)
            .get('/api/songs/' + slug)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;

                expect(res).to.be.an('object');
                expect(res.body.status).to.be.equal('ok');
                expect(res.body.song).to.be.an('object');
                done();
            });
    });
});

describe('GET /api/songs/genre/:slug', function() {
    this.timeout(5000);

    it('should return a JSON array of news of the same tag', function(done) {
        var slug = 'rock';

        request(app)
            .get('/api/songs/genre/' + slug)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;

                expect(res).to.be.an('object');
                expect(res.body.status).to.be.equal('ok');
                expect(res.body.songs).to.be.an('array');
                expect(res.body.count).to.be.equal(res.body.songs.length);
                done();
            });
    });
});

describe('GET /api/songs/tag/:slug', function() {
    this.timeout(5000);

    it('should return a JSON array of news of the same category', function(done) {
        var slug = 'rotazione';

        request(app)
            .get('/api/songs/tag/' + slug)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;

                expect(res).to.be.an('object');
                expect(res.body.status).to.be.equal('ok');
                expect(res.body.songs).to.be.an('array');
                expect(res.body.count).to.be.equal(res.body.songs.length);
                done();
            });
    });
});
