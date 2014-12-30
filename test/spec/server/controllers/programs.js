var expect = require('expect.js');
var request = require('supertest');
var app = require(process.cwd() + '/app.js');

describe('GET /api/programs', function() {
    this.timeout(5000);

    it('should return a JSON array of programs', function(done) {
        request(app)
            .get('/api/programs')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;

                expect(res).to.be.an('object');
                expect(res.body.status).to.be.equal('ok');
                expect(res.body.programs).to.be.an('array');
                expect(res.body.count).to.be.equal(res.body.programs.length);
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

                expect(res).to.be.an('object');
                expect(res.body.status).to.be.equal('ok');
                expect(res.body.program).to.be.an('object');
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

                expect(res).to.be.an('object');
                expect(res.body.status).to.be.equal('ok');
                expect(res.body.schedule).to.be.an('array');
                expect(res.body.schedule.length).to.be.equal(7);
                done();
            });
    });
});

