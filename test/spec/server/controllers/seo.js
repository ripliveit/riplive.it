var expect = require('expect.js');
var request = require('supertest');
var libxmljs = require('libxmljs');
var app = require(process.cwd() + '/app.js');

describe('GET /sitemap.xml', function() {
    this.timeout(15000);

    it('should return an xml sitemap', function(done) {
        request(app)
            .get('/sitemap.xml')
            .set('Accept', 'text/xml')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;

                expect(res.header['content-type']).to.be.equal('text/xml');

                var xmlDoc = libxmljs.parseXml(res.text);

                done();
            });
    });
});

