var expect = require('expect.js');
var logger = require(__dirname + '/../../services/logger.js');

describe('Logger', function() {
    it('is an object used to create log file and stream', function() {
        expect(logger).to.be.an('object');
        expect(logger).to.have.property('streams');
        expect(logger).to.have.property('fields');
        expect(logger.fields).to.be.an('object');
        expect(logger.fields).to.have.property('name');
        expect(logger.fields.name).to.be.equal('riplive');
    });
});