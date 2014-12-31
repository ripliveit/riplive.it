var expect = require('expect.js');
var userService = require(process.cwd() + '/server/services/user.js');
var fakeUser = {
    emails: [{
        value : 'dummy1@email.com'
    }],
    username: 'dummy',
    displayName: 'dummy',
};

describe('UserService', function() {
    it('is an object used query and manipulate user data', function() {

        expect(userService).to.be.an('object');
        expect(userService).to.have.property('find');
        expect(userService).to.have.property('persists');

        describe('#find', function() {
            it('should return an user by its unique email', function(done) {
                var email = 'darrigos@hotmail.com';

                userService.find(email, function(err, data) {
                    var data = JSON.parse(data);

                    expect(data.status).to.be.equal('ok');
                    expect(data).to.have.property('user');
                    expect(data.user).to.be.an('object');
                    expect(data.user).to.have.property('email');
                    expect(data.user.email).to.be.equal(email);
                    done();
                });
            });
        });

        describe('#persists', function() {
            it('should persists a new user into the remote storage. A social provider must be specified.' +
                ' Only facebook provider is now implemented',
                function(done) {
                    var provider = 'facebook';

                    userService.persists(provider, fakeUser, function(err, res) {
                        var res = JSON.parse(res);
                        
                        expect(res).to.be.an('object');
                        expect(res.status).to.be.equal('error');
                        expect(res.type).to.be.equal('duplicate');
                        done();
                    });
                });
        });
    });
});