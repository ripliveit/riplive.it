var expect = require('expect.js');
var AuthorDao = require(__dirname + '/../../daos/author.js');

describe('AuthorDao', function() {
    it('is an object used to retrieve author\'s information from remote endpoint', function() {
        var authorDao = new AuthorDao();

        expect(authorDao).to.be.an('object');
        expect(authorDao).to.have.property('getAuthorBySlug');
        expect(authorDao).to.have.property('getAllAuthors');

        describe('#getAuthorBySlug', function() {
            it('should return a single author object', function(done) {
                var slug = 'ilfratus';

                authorDao.getAuthorBySlug(slug, function(err, data) {
                    if (err) throw err;

                    var data = JSON.parse(data);

                    expect(data).to.be.an('object');
                    expect(data.status).to.be('ok');
                    expect(data.author).to.be.an('object');
                    expect(data.author.slug).to.be.equal(slug);
                    done();
                });
            });
        });

        describe('#getAllAuthors', function() {
            it('should return an array of authors', function(done) {
                var criteria = {
                    page: 1
                };

                authorDao.getAllAuthors(criteria, function(err, data) {
                    if (err) throw err;

                    var data = JSON.parse(data);

                    expect(data).to.be.an('object');
                    expect(data.status).to.be('ok');
                    expect(data.authors).to.be.an('array');
                    expect(data.count).to.be.equal(data.authors.length);
                    done();
                });
            });
        });
    });
});
