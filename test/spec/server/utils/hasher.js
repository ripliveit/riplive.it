let expect = require('expect.js');
let sinon  = require('sinon');
let rewire = require('rewire');
let hasher = rewire(process.cwd() + '/server/utils/hasher.js');

describe('Hasher', function() {
    let sandbox,
        hash = { update(){}, digest(){} },
        createHashFn, updateFn, digestFn;

    beforeEach(function() {
        sandbox = sinon.sandbox.create();
        createHashFn = sandbox.spy(format => hash);
        updateFn = sandbox.stub(hash, 'update', data => this);
        digestFn = sandbox.stub(hash, 'digest', encoding => this);

        hasher.__set__('crypto', {
            createHash: createHashFn
        });
    });

    afterEach(function() {
        sandbox.restore();
    });

    it('is an object used to calculate an MD5 hash', function() {
        expect(hasher).to.be.an('object');
        expect(hasher).to.have.property('getHash');
    });

    describe('#getHash', function() {
        it('should return an md5 hasher', function() {
            const string = 'this.is.string';
            const md5 = hasher.getHash(string);

            expect(createHashFn.callCount).to.be.equal(1);
            expect(createHashFn.calledWith('md5')).to.be.equal(true);

            expect(updateFn.callCount).to.be.equal(1);
            expect(updateFn.calledWith(string)).to.be.equal(true);

            expect(digestFn.callCount).to.be.equal(1);
            expect(digestFn.calledWith('hex')).to.be.equal(true);

            //const hash = crypto.createHash('md5')
            //    .update(string)
            //    .digest('hex');
        });
    });
});
