var expect      = require('expect.js');
var sinon       = require('sinon');
var config      = require('config');
var memcached   = require(process.cwd() + '/server/services/memcached-client.js');
var HttpService = require(process.cwd() + '/server/services/http-service.js');
var hasher      = require(process.cwd() + '/server/services/hasher.js');
var Broker      = require(process.cwd() + '/server/services/memcached-broker.js');
var UserDao     = require(process.cwd() + '/server/daos/user.js');
var broker      = new Broker(memcached, HttpService);

describe('UserDao', function() {

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
