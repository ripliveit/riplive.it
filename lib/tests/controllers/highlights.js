var expect = require('expect.js');
var request = require('supertest');
var app = require(__dirname + '/../../../app.js')

describe('GET /api/highlights', function() {
    this.timeout(5000);

    it('should return a JSON array of highlights', function(done) {
        request(app)
            .get('/api/highlights')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                
                expect(res).to.be.an('object');
                expect(res.body.status).to.be.equal('ok');
                expect(res.body.highlights).to.be.an('array');
                expect(res.body.count).to.be.equal(res.body.highlights.length);
                done();
            });
    });
});
