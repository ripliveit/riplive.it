var expect = require('expect.js');
var request = require('supertest');
var app = require(__dirname + '/../../../app.js')

describe('GET /api/songs', function() {
    this.timeout(5000);

    it('should return a JSON array of songs', function(done) {
        request(app)
            .get('/api/songs')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                done();
            });
    });
});

describe('GET /api/news/:slug', function() {
    this.timeout(5000);

    it('should return a single JSON news object', function(done) {
        var slug = 'ilfratus';

        request(app)
            .get('/api/news/' + slug)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                done();
            });
    });
});

describe('GET /api/categories/:slug', function() {
    this.timeout(5000);

    it('should return a JSON array of news of the same category', function(done) {
        var slug = 'cinema';

        request(app)
            .get('/api/categories/' + slug)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                done();
            });
    });
});

describe('GET /api/tags/:slug', function() {
    this.timeout(5000);

    it('should return a JSON array of news of the same tag', function(done) {
        var slug = 'rip-on-tour';

        request(app)
            .get('/api/tags/' + slug)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                done();
            });
    });
});
var expect = require('expect.js');
var request = require('supertest');
var app = require(__dirname + '/../../../app.js')

describe('GET /api/news', function() {
    this.timeout(5000);

    it('should return a JSON array of news', function(done) {
        request(app)
            .get('/api/news')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                done();
            });
    });
});

describe('GET /api/news/:slug', function() {
    this.timeout(5000);

    it('should return a single JSON news object', function(done) {
        var slug = 'ilfratus';

        request(app)
            .get('/api/news/' + slug)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                done();
            });
    });
});

describe('GET /api/categories/:slug', function() {
    this.timeout(5000);

    it('should return a JSON array of news of the same category', function(done) {
        var slug = 'cinema';

        request(app)
            .get('/api/categories/' + slug)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                done();
            });
    });
});

describe('GET /api/tags/:slug', function() {
    this.timeout(5000);

    it('should return a JSON array of news of the same tag', function(done) {
        var slug = 'rip-on-tour';

        request(app)
            .get('/api/tags/' + slug)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                done();
            });
    });
});
