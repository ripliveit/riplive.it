let expect = require('expect.js');
let sinon = require('sinon');
let rewire = require('rewire');
let client = rewire('../../../../server/http/client.js');

describe('Client', function () {
    let broker = {
        get(){},
        set(){}
    }, http = {
        get(){}
    }, data = {
        data: true
    };

    let sandbox, getFn, setFn, httpGetFn;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        getFn = sandbox.stub(broker, 'get');
        setFn = sandbox.stub(broker, 'set');
        httpGetFn = sandbox.stub(http, 'get');

        getFn.onFirstCall(0).returns();
        getFn.onCall(1).returns(null);
        httpGetFn.onCall(0).returns(data);

        client.__set__('broker', broker);
        client.__set__('http', {get: httpGetFn});
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('is the client used to retrieve data from Riplive.it backend API', function () {
        expect(client).to.be.an('object');
        expect(client).to.have.property('execute');
    });

    describe('#execute', function () {
        it('should run a specific Command and retrieve data first from the cache layer', function () {
            const command = {
                uri: 'http://www.google.com',
                key: 'this.is.a.key',
                time: 200
            };

            client.execute(command, () => {
                expect(getFn.callCount).to.be.equal(1);
                expect(getFn.calledWith(command.key)).to.be.equal(true);
                expect(httpGetFn.callCount).to.be.equal(0);
            });
        });

        it('should run a specific Command, retrieve data from Riplive.it backend API, then persist on cache layer', function () {
            const command = {
                uri: 'http://www.google.com',
                key: 'this.is.a.key',
                time: 200
            };

            client.execute(command, () => {
                expect(getFn.callCount).to.be.equal(1);
                expect(getFn.calledWith(command.key)).to.be.equal(true);

                expect(httpGetFn.callCount).to.be.equal(1);
                expect(httpGetFn.calledWith(command.uri)).to.be.equal(true);

                expect(setFn.callCount).to.be.equal(1);
                expect(setFn.calledWith(data)).to.be.equal(true);
            });
        });
    });
});


