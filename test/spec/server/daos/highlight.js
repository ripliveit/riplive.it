var expect = require('expect.js');
var HighlightDao = require(process.cwd() + '/server/daos/highlight.js');

describe('HighlightDao', function() {
    it('is an object used to retrieve artist\'s information from remote endpoint', function() {
        var highlightDao = new HighlightDao();

        expect(highlightDao).to.be.an('object');
        expect(highlightDao).to.have.property('getHighlights');

        describe('#getHighlights', function() {
            it('should return an array of highlights', function(done) {
                var criteria = {
                    count : 6,
                    page: 1
                };

                highlightDao.getHighlights(criteria, function(err, data) {
                    if (err) throw err;

                    var data = JSON.parse(data);

                    expect(data).to.be.an('object');
                    expect(data.status).to.be('ok');
                    expect(data.highlights).to.be.an('object');
                    expect(data.highlights.length).to.be.equal(data.count);
                    
                    done();
                });
            });
        });
    });
});
