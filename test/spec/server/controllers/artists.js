var expect = require('expect.js');
var request = require('supertest');
var app = require(process.cwd() + '/app.js');

describe('GET /api/artists', function() {
    this.timeout(10000);

    it('should return a single JSON artist object', function(done) {
        request(app)
            .get('/api/artists')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;

                expect(res).to.be.an('object');
                expect(res.body.status).to.be.equal('ok');
                expect(res.body.artists).to.be.an('array');
                expect(res.body.count).to.be.equal(res.body.artists.length);
                done();
            });
    });
});

describe('GET /api/artists/:slug', function() {
    this.timeout(10000);

    it('should return a JSON array of artists', function(done) {
        var slug = 'deserto-rosso';

        request(app)
            .get('/api/artists/' + slug)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;

                expect(res).to.be.an('object');
                expect(res.body.status).to.be.equal('ok');
                expect(res.body.artist).to.be.an('object');
                done();
            });
    });
});

describe('GET /api/artists/genre/:slug', function() {
    this.timeout(10000);

    it('should return a JSON array of artist within a specific genre', function(done) {
        var slug = 'rock';

        request(app)
            .get('/api/artists/genre/' + slug)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                
                expect(res).to.be.an('object');
                expect(res.body.status).to.be.equal('ok');
                expect(res.body.genre.slug).to.be.equal(slug);
                expect(res.body.artists).to.be.an('array');
                expect(res.body.count).to.be.equal(res.body.artists.length);
                done();
            });
    });
});

describe('GET /api/artists/tag/:slug', function() {
    this.timeout(10000);

    it('should return a JSON array of artist within a specific tag', function(done) {
        var slug = 'pop';

        request(app)
            .get('/api/artists/tag/' + slug)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                
                expect(res).to.be.an('object');
                expect(res.body.status).to.be.equal('ok');
                expect(res.body.tag.slug).to.be.equal(slug);
                expect(res.body.artists).to.be.an('array');
                expect(res.body.count).to.be.equal(res.body.artists.length);
                done();
            });
    });
});

describe('GET /api/genres/artists', function() {
    this.timeout(10000);
    
    it('should return a JSON array of all artists genre', function(done) {
        request(app)
            .get('/api/genres/artists')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                done();
            });
    });
});
