var expect = require('expect.js');
var request = require('supertest');
var app = require(process.cwd() + '/app.js');

describe('GET /api/charts', function() {
    this.timeout(5000);

    it('should return a JSON array of charts', function(done) {
        request(app)
            .get('/api/charts')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                
                expect(res).to.be.an('object');
                expect(res.body.status).to.be.equal('ok');
                expect(res.body.complete_charts).to.be.an('array');
                expect(res.body.count).to.be.equal(res.body.complete_charts.length);
                done();
            });
    });
});

describe('GET /api/charts/:slug', function() {
    this.timeout(5000);

    it('should return a single JSON chart object', function(done) {
        var slug = 'pop-chart-2014-10-13';

        request(app)
            .get('/api/charts/' + slug)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                
                expect(res).to.be.an('object');
                expect(res.body.status).to.be.equal('ok');
                expect(res.body.complete_chart).to.be.an('object');
                done();
            });
    });
});

describe('GET /api/charts/complete/:slug', function() {
    this.timeout(5000);

    it('should return a JSON array of charts within a specific chart type', function(done) {
        var slug = 'rock-chart';

        request(app)
            .get('/api/charts/complete/' + slug)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                
                expect(res).to.be.an('object');
                expect(res.body.status).to.be.equal('ok');
                expect(res.body.complete_charts).to.be.an('array');
                expect(res.body.count).to.be.equal(res.body.complete_charts.length);
                done();
            });
    });
});

describe('GET /api/charts/latest', function() {
    this.timeout(5000);

    it('should return a JSON array of charts, one per chart type', function(done) {

        request(app)
            .get('/api/charts/latest')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
              
                expect(res).to.be.an('object');
                expect(res.body.status).to.be.equal('ok');
                expect(res.body.complete_charts).to.be.an('array');
                expect(res.body.count).to.be.equal(res.body.complete_charts.length);
                done();
            });
    });
});

describe('POST /api/charts/vote', function() {
    this.timeout(5000);

    it('should responde with 200 OK', function(done) {
        var vote = {
            chart_archive_slug: "electronic-chart-2014-10-27",
            id_song: 9584,
            username: "cotto.gustato",
            uuid_user: "756c58f0-6278-11e4-8293-8d2f2cfa6647"
        };

        request(app)
            .post('/api/charts/vote')
            .send(vote)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                done();
            });
    });
});
