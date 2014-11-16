var expect = require('expect.js');
var request = require('supertest');
var app = require(__dirname + '/../../../app.js')

describe('GET /api/users/:uuid', function() {
    this.timeout(5000);

    it('should return a single JSON user object', function(done) {
        var uuid = 'c2cfc9e0-b749-11e3-8ade-ff64b8dd6b9c';

        request(app)
            .get('/api/users/' + uuid)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;

                expect(res).to.be.an('object');
                expect(res.body.status).to.be.equal('ok');
                expect(res.body.user).to.be.an('object');
                expect(res.body.user.uuid).to.be.equal(uuid);
                
                done();
            });
    });
});