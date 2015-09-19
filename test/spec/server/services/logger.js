var expect = require('expect.js');
var logger = require(process.cwd() + '/server/services/logger.js');

describe('Logger', function() {
    it('is an object used to create log file and stream', function() {
        expect(logger).to.be.an('object');
        expect(logger).to.have.property('transports');
    });
});