var expect = require('expect.js');
var UserDao = require(process.cwd() + '/server/daos/user.js');

describe('UserDao', function() {
    it('is an object used to retrieve user information from remote endpoint', function() {
        var userDao = new UserDao();

        expect(userDao).to.be.an('object');
        expect(userDao).to.have.property('getUserByUuid');

        describe('#getUserByUuid', function() {
            it('should return a user object', function(done) {
                var uuid = 'c2cfc9e0-b749-11e3-8ade-ff64b8dd6b9c';

                userDao.getUserByUuid(uuid, function(err, data) {
                    if (err) throw err;

                    var data = JSON.parse(data);

                    expect(data).to.be.an('object');
                    expect(data.status).to.be('ok');
                    expect(data.user).to.be.an('object');
                    expect(data.user.uuid).to.be.equal(uuid);
                    
                    done();
                });
            });
        });
    });
});
