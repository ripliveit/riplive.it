'use strict';

const expect = require('expect.js');
const sinon  = require('sinon');
const rewire = require('rewire');
const broker = rewire(process.cwd() + '/server/utils/memcached-broker.js');

describe('MemcachedBroker', function() {
    let sandbox, getFn, setFn, httpGetFn;

    beforeEach(function() {
        sandbox = sinon.sandbox.create();

        getFn = sandbox.spy((key, cb) => cb());
        setFn = sandbox.spy((key, value, lifetime, cb) => cb());
        httpGetFn = sandbox.spy((uri, cb) => cb());

        broker.__set__('client', {
            get: getFn,
            set: setFn
        });

        broker.__set__('http', {
            get: httpGetFn
        });
    });

    afterEach(function() {
        sandbox.restore();
    });

    it('is an object used to persists and cache data into a memcached server instance' +
        'or to retrieve data from a remote endpoint ',
        function() {
            expect(broker).to.be.an('object');
            expect(broker).to.have.property('setTime');
            expect(broker).to.have.property('getTime');
            expect(broker).to.have.property('set');
            expect(broker).to.have.property('get');
        });

    describe('#setTime', function() {
        it('should set the default caching lifetime of the broker', function() {
            broker.setTime(60);
            expect(broker.getTime()).to.be.equal(60);
        });
    });

    describe('#getTime', function() {
        it('should return the default caching time of the broker', function() {
            let defaultTime = broker.getTime();
            expect(defaultTime).to.be.equal(60);
        });
    });

    describe('#set', function() {
        it('should set value into memcached, invoking set method into the client.', function() {
            let key = 'this.is.a.key';
            let value = 'this.is.a.value';

            broker.set(key, value, () => {
                expect(setFn.callCount).to.be.equal(1);
                expect(setFn.calledWith(key, value)).to.be.equal(true);
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

        it('should retrieve data from http if not in memcached', function() {
            let uri = 'this.is.a.uri';
            let key = 'this.is.a.key';

            broker.doRequest(uri, key, () => {
                expect(httpGetFn.callCount).to.be.equal(1);
                expect(httpGetFn.calledWith(uri)).to.be.equal(true);
            });
        });
    });
});