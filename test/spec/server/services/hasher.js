var expect = require('expect.js');
var hasher = require(__dirname + '/../../services/hasher.js');

describe('Hasher', function() {
    it('is an object used to calculate an MD5 hash', function() {

        expect(hasher).to.be.an('object');
        expect(hasher).to.have.property('getHash');

        describe('#getHash', function() {
            it('should return an md5 hasher', function() {
                var string = 'this.is.string';

                var md5 = hasher.getHash(string);
                expect(md5).to.be.a('string');
                expect(md5.length).to.be.equal(32);
            });
        });
    });
});
