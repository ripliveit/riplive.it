var expect      = require('expect.js');
var sinon       = require('sinon');
var config      = require('config');
var memcached   = require(process.cwd() + '/server/services/memcached-client.js');
var HttpService = require(process.cwd() + '/server/services/http-service.js');
var hasher      = require(process.cwd() + '/server/services/hasher.js');
var Broker      = require(process.cwd() + '/server/services/memcached-broker.js');
var ProgramDao  = require(process.cwd() + '/server/daos/program.js');
var broker      = new Broker(memcached, HttpService);
var programDao = new ProgramDao(config, hasher, broker);

describe('ProgramDao', function() {
    beforeEach(function() {
        sinon.stub(memcached, 'get', function(key, cb) {
            return cb(null, false);
        });

        sinon.stub(memcached, 'set', function(key, value, lifetime, cb) {
            return cb(null, value);
        });

        sinon.stub(broker, 'set', function(key, body, cb) {
            return cb(null, body);
        });
    });

    afterEach(function() {
        memcached.get.restore();
        memcached.set.restore();
        broker.set.restore();
    });

    it('is an object used to retrieve program information from remote endpoint', function() {
        expect(programDao).to.be.an('object');
        expect(programDao).to.have.property('getProgramBySlug');
        expect(programDao).to.have.property('getAllPrograms');
        expect(programDao).to.have.property('getProgramsSchedule');
    });

    describe('#getProgramBySlug', function() {
        this.timeout(15000);
        
        it('should return a single program object', function(done) {
            var slug = 'back-to-the-movies';

            programDao.getProgramBySlug(slug, function(err, data) {
                if (err) throw err;

                var data = JSON.parse(data);

                expect(data).to.be.an('object');
                expect(data.status).to.be('ok');
                expect(data.program).to.be.an('object');
                expect(data.program.slug).to.be.equal(slug);
                done();
            });
        });
    });

    describe('#getAllPrograms', function() {
        this.timeout(15000);

        it('should return an array of programs', function(done) {
            var criteria = {
                count: 24,
                page: 1
            };

            programDao.getAllPrograms(criteria, function(err, data) {
                if (err) throw err;

                var data = JSON.parse(data);

                expect(data).to.be.an('object');
                expect(data.status).to.be('ok');
                expect(data.programs).to.be.an('array');
                expect(data.count).to.be.equal(data.programs.length);
                done();
            });
        });
    });

    describe('#getProgramsSchedule', function() {
        this.timeout(15000);

        it('should return the programs schedule', function(done) {
            var criteria = {
                count: 24,
                page: 1
            };

            programDao.getProgramsSchedule(function(err, data) {
                if (err) throw err;

                var data = JSON.parse(data);

                expect(data).to.be.an('object');
                expect(data.status).to.be('ok');
                expect(data.schedule).to.be.an('array');
                expect(data.schedule.length).to.be.equal(7);
                done();
            });
        });
    });
});
