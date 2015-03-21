var expect = require('expect.js');
var libxmljs = require('libxmljs');
var SeoDao = require(process.cwd() + '/server/daos/seo.js');

describe('SeoDao', function() {
    it('is an object used to retrieve author\'s information from remote endpoint', function() {
        var seoDao = new SeoDao();

        expect(seoDao).to.be.an('object');
        expect(seoDao).to.have.property('getSiteMap');
        expect(seoDao).to.have.property('getMetaByPath');

        describe('#getSiteMap', function() {
        	this.timeout(10000);

            it('should return an xml string', function(done) {
                seoDao.getSiteMap(function(err, data) {
                    if (err) throw err;

                    var xmlDoc = libxmljs.parseXml(data);
                    done();
                });
            });
        });

        describe('#getMetaByPath', function() {
        	this.timeout(10000);

            it('should return an array of metatag', function(done) {
                var path = '/news/attimi-di-ordinaria-follia';

                seoDao.getMetaByPath(path, function(err, data) {
                    if (err) throw err;

                    expect(data).to.be.an('object');
                    expect(data).to.have.property('path');
                    expect(data.path).to.be.equal(path);

                    done();
                });
            });
        });
    });
});
