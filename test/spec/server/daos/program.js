var expect = require('expect.js');
var ProgramDao = require(process.cwd() + '/server/daos/program.js');

describe('ProgramDao', function() {
    it('is an object used to retrieve program information from remote endpoint', function() {
        var programDao = new ProgramDao();

        expect(programDao).to.be.an('object');
        expect(programDao).to.have.property('getProgramBySlug');
        expect(programDao).to.have.property('getAllPrograms');
        expect(programDao).to.have.property('getProgramsSchedule');

        describe('#getProgramBySlug', function() {
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
            this.timeout(5000);

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
            this.timeout(5000);

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
});
