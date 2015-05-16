var expect = require('expect.js');
var request = require('supertest');
var app = require(process.cwd() + '/app.js');

describe('GET /api/news', function() {
    this.timeout(15000);

    it('should return a JSON array of news', function(done) {
        request(app)
            .get('/api/news')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;

                expect(res).to.be.an('object');
                expect(res.body.status).to.be.equal('ok');
                expect(res.body.posts).to.be.an('array');
                expect(res.body.count).to.be.equal(res.body.posts.length);
                done();
            });
    });
});

describe('GET /api/news/:slug', function() {
    this.timeout(15000);

    it('should return a single JSON news object', function(done) {
        var slug = 'dark-shadows-un-gavettone-di-puttanate-e-non-avevo-caldo';

        request(app)
            .get('/api/news/' + slug)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                
                expect(res).to.be.an('object');
                expect(res.body.status).to.be.equal('ok');
                expect(res.body.post).to.be.an('object');
                done();
            });
    });
});

describe('GET /api/categories/:slug', function() {
    this.timeout(15000);

    it('should return a JSON array of news of the same category', function(done) {
        var slug = 'cinema';

        request(app)
            .get('/api/categories/' + slug)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;

                expect(res).to.be.an('object');
                expect(res.body.status).to.be.equal('ok');
                expect(res.body.category.slug).to.be.equal(slug);
                expect(res.body.posts).to.be.an('array');
                expect(res.body.count).to.be.equal(res.body.posts.length);
                done();
            });
    });
});

describe('GET /api/tags/:slug', function() {
    this.timeout(15000);

    it('should return a JSON array of news of the same tag', function(done) {
        var slug = 'rip-on-tour';

        request(app)
            .get('/api/tags/' + slug)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                
                expect(res).to.be.an('object');
                expect(res.body.status).to.be.equal('ok');
                expect(res.body.tag.slug).to.be.equal(slug);
                expect(res.body.posts).to.be.an('array');
                expect(res.body.count).to.be.equal(res.body.posts.length);
                done();
            });
    });
});
