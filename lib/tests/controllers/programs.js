var expect = require('expect.js');
var request = require('supertest');
var app = require(__dirname + '/../../../app.js')

describe('GET /api/programs', function() {
    this.timeout(5000);

    it('should return a JSON array of programs', function(done) {
        request(app)
            .get('/api/podcasts')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                done();
            });
    });
});

describe('GET /api/programs/:slug', function() {
    this.timeout(5000);

    it('should return a JSON programs object', function(done) {
        var slug = 'back-to-the-movies';

        request(app)
            .get('/api/programs/' + slug)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                done();
            });
    });
});

describe('GET /api/schedule', function() {
    this.timeout(5000);

    it('should return a JSON array object rapresenting the weekly programs schedule', function(done) {
         request(app)
            .get('/api/schedule/')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                done();
            });
    });
});

