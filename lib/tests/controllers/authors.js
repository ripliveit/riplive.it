var expect = require('expect.js');
var request = require('supertest');
var app = require(__dirname + '/../../../app.js')

describe('GET /api/authors', function() {
    this.timeout(5000);

    it('should return a JSON array of authors', function(done) {
        request(app)
            .get('/api/authors')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                done();
            });
    });
});

describe('GET /api/authors/:slug', function() {
    this.timeout(5000);

    it('should return a single JSON author object', function(done) {
        var slug = 'ilfratus';

        request(app)
            .get('/api/authors/' + slug)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                done();
            });
    });
});