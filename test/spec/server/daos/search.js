var expect = require('expect.js');
var SearchDao = require(__dirname + '/../../daos/search.js');

describe('SearchDao', function() {
    it('is an object used to search against a remote endpoint', function() {
        var searchDao = new SearchDao();

        expect(searchDao).to.be.an('object');
        expect(searchDao).to.have.property('getSearchResults');

        describe('#getSearchResults', function() {
            it('should return an array of data', function(done) {
                var criteria = {
                    search : 'free mama',
                    type : 'artists',
                    count: 1
                };

                searchDao.getSearchResults(criteria, function(err, data) {
                    if (err) throw err;

                    var data = JSON.parse(data);

                    expect(data).to.be.an('object');
                    expect(data.status).to.be('ok');
                    expect(data.posts).to.be.an('array');
                    expect(data.posts[0].type).to.be.equal(criteria.type);
                    expect(data.posts.length).to.be.equal(criteria.count);
                    
                    done();
                });
            });
        });
    });
});
