var expect = require('expect.js');
var request = require('supertest');
var app = require(process.cwd() + '/app.js');

describe('GET /api/podcasts', function() {
    this.timeout(10000);

    it('should return a JSON array of podcasts', function(done) {
        request(app)
            .get('/api/podcasts')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;

                expect(res).to.be.an('object');
                expect(res.body.status).to.be.equal('ok');
                expect(res.body.podcasts).to.be.an('array');
                expect(res.body.count).to.be.equal(res.body.podcasts.length);
                done();
            });
    });
});

describe('GET /api/podcasts/:program_slug', function() {
    this.timeout(10000);

    it('should return a JSON array of podcasts of a specific program', function(done) {
        var slug = 'back-to-the-movies';

        request(app)
            .get('/api/podcasts/' + slug)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;

                expect(res).to.be.an('object');
                expect(res.body.status).to.be.equal('ok');
                expect(res.body.podcasts).to.be.an('array');
                expect(res.body.count).to.be.equal(res.body.podcasts.length);
                done();
            });
    });
});

describe('GET /api/podcasts/:program_slug/:id', function() {
    this.timeout(10000);

    it('should return a JSON podcast object', function(done) {
        var slug = 'back-to-the-movies';
        var id   = 814;

        request(app)
            .get('/api/podcasts/' + slug + '/' + id)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;

                expect(res).to.be.an('object');
                expect(res.body.status).to.be.equal('ok');
                expect(res.body.podcast).to.be.an('object');
                done();
            });
    });
});

