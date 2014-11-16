var expect = require('expect.js');
var request = require('supertest');
var app = require(__dirname + '/../../../app.js')

describe('GET /api/users/:uuid', function() {
    this.timeout(5000);

    it('should return a single JSON user object', function(done) {
        var uuid = '';

        request(app)
            .get('/api/user/' + uuid)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                done();
            });
    });
});