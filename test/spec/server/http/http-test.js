let expect = require('expect.js');
let sinon = require('sinon');
let rewire = require('rewire');
let http = rewire('../../../../server/http/http.js');

describe('Http', function () {
    let sandbox, getFn, postFn;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        getFn = sandbox.spy((uri, cb) => cb());
        postFn = sandbox.spy((uri, data, cb) => cb());

        http.__set__('request', {
            get: getFn,
            post: postFn
        });
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('is a simple wrapper used to make HTTP Request.', function () {
        expect(http).to.be.an('object');
        expect(http).to.have.property('get');
        expect(http).to.have.property('post');
    });

    describe('#get', function () {
        it('should execute a correct GET http request', function (done) {
            const uri = 'http://www.google.it';

            http.get(uri, () => {
                expect(getFn.callCount).to.be.equal(1);
                expect(getFn.calledWith(uri)).to.be.equal(true);
                done();
            });
        });
    });

    describe('#post', function () {
        it('should execute a correct POST http request. Accept a data argument', function (done) {
            const uri = 'http://www.google.it';
            const data = {
                data: 'fake data dude'
            };

            http.post(uri, data, () => {
                expect(postFn.callCount).to.be.equal(1);
                expect(postFn.calledWith(uri, {form: data})).to.be.equal(true);
                done();
            });
        });
    });
});