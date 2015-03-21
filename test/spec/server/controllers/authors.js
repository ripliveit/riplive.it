var expect = require('expect.js');
var request = require('supertest');
var app = require(process.cwd() + '/app.js');

describe('GET /api/authors', function() {
    this.timeout(10000);

    it('should return a JSON array of authors', function(done) {
        request(app)
            .get('/api/authors')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;

                expect(res).to.be.an('object');
                expect(res.body.status).to.be.equal('ok');
                expect(res.body.authors).to.be.an('array');
                expect(res.body.count).to.be.equal(res.body.authors.length);
                done();
            });
    });
});

describe('GET /api/authors/:slug', function() {
    this.timeout(10000);

    it('should return a single JSON author object', function(done) {
        var slug = 'ilfratus';

        request(app)
            .get('/api/authors/' + slug)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;

                expect(res).to.be.an('object');
                expect(res.body.status).to.be.equal('ok');
                expect(res.body.author).to.be.an('object');
                done();
            });
    });
});
