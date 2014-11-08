var expect = require('expect.js');
var NewsDao = require(__dirname + '/../../daos/news.js');

describe('NewsDao', function() {
    it('is an object used to retrieve artist\'s information from remote endpoint', function() {
        var newsDao = new NewsDao();

        expect(newsDao).to.be.an('object');
        expect(newsDao).to.have.property('getNewsBySlug');
        expect(newsDao).to.have.property('getAllNews');
        expect(newsDao).to.have.property('getNewsByCategory');
        expect(newsDao).to.have.property('getNewsByTag');

        describe('#getNewsBySlug', function() {
            it('should return a single news object', function(done) {
                var slug = 'izombie';

                newsDao.getNewsBySlug(slug, function(err, data) {
                    if (err) throw err;

                    var data = JSON.parse(data);

                    expect(data).to.be.an('object');
                    expect(data.status).to.be('ok');
                    expect(data.post).to.be.an('object');
                    expect(data.post.slug).to.be.equal(slug);
                    done();
                });
            });
        });

        describe('#getAllNews', function() {
            this.timeout(10000);

            it('should return an array of news', function(done) {
                var criteria = {
                    count: 24,
                    page: 1
                };

                newsDao.getAllNews(criteria, function(err, data) {
                    if (err) throw err;

                    var data = JSON.parse(data);

                    expect(data).to.be.an('object');
                    expect(data.status).to.be('ok');
                    expect(data.posts).to.be.an('array');
                    expect(data.count).to.be.equal(data.posts.length);
                    done();
                });
            });
        });

        describe('#getNewsByCategory', function() {
            this.timeout(10000);

            it('should return all news within a particular category', function(done) {
                var slug = 'cinema';
                var criteria = {
                    count: 24,
                    page: 1
                };

                newsDao.getNewsByCategory(slug, criteria, function(err, data) {
                    if (err) throw err;

                    var data = JSON.parse(data);

                    expect(data).to.be.an('object');
                    expect(data.status).to.be('ok');
                    expect(data.posts).to.be.an('array');
                    expect(data.count).to.be.equal(data.posts.length);
                    done();
                });
            });
        });

        describe('#getNewsByTag', function() {
            this.timeout(10000);

            it('should return all news within a specific tag', function(done) {
                var slug = 'halloween';
                var criteria = {
                    count: 24,
                    page: 1
                };

                newsDao.getNewsByTag(slug, criteria, function(err, data) {
                    if (err) throw err;

                    var data = JSON.parse(data);

                    expect(data).to.be.an('object');
                    expect(data.status).to.be('ok');
                    expect(data.posts).to.be.an('array');
                    expect(data.count).to.be.equal(data.posts.length);
                    done();
                });
            });
        });
    });
});
