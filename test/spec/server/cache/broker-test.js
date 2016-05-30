let expect = require('expect.js');
let sinon  = require('sinon');
let rewire = require('rewire');
let broker = rewire('../../../../server/cache/broker.js');

describe('Broker', function() {
    let sandbox, getFn, setFn;

    beforeEach(function() {
        sandbox = sinon.sandbox.create();
        getFn = sandbox.spy((key, cb) => cb());
        setFn = sandbox.spy((key, value, lifetime, cb) => cb());
        broker.__set__('client', { get: getFn, set: setFn });
    });

    afterEach(function() {
        sandbox.restore();
    });

    it('is an object used to persists and cache data into a memcached server instance or to retrieve data from a remote endpoint ',
        function() {
            expect(broker).to.be.an('object');
            expect(broker).to.have.property('getDefaultLifeTime');
            expect(broker).to.have.property('set');
            expect(broker).to.have.property('get');
        });

    describe('#getDefaultLifeTime', function() {
        it('should return the default caching time of the broker', function() {
            expect(broker.getDefaultLifeTime()).to.be.equal(60);
        });
    });

    describe('#set', function() {
        it('should set value into memcached, invoking set method into the client.', function() {
            let key = 'this.is.a.key';
            let value = 'this.is.a.value';
            let time = 70;

            broker.set(key, value, time, () => {
                expect(setFn.callCount).to.be.equal(1);
                expect(setFn.calledWith(key, time, 70)).to.be.equal(true);
            });
        });
    });

    describe('#get', function() {
        it('should return data from memcached, invoking get method from the client', function() {
            let key = 'this.is.a.key';
            let uri = 'this.is.a.uri';

            broker.get(key, uri, () => {
                expect(getFn.callCount).to.be.equal(1);
                expect(getFn.calledWith(key)).to.be.equal(true);
            });
        });
    });
});