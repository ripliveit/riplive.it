var expect = require('expect.js');
var request = require('supertest');
var app = require(process.cwd() + '/app.js');

describe('GET /api/search', function() {
    this.timeout(10000);

    it('should return a JSON array of search results', function(done) {
        var query = '?search=dracula&count=1';

        request(app)
            .get('/api/search' + query)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;

                expect(res).to.be.an('object');
                expect(res.body.status).to.be.equal('ok');
                expect(res.body.count).to.be.equal(1);
                done();
            });
    });
});
