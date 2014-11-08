var expect = require('expect.js');
var httpService = require(__dirname + '/../../services/http-service.js');

describe('HttpService', function() {
    it('is a simple service used to make Http Request. Wrap request npm package.', function() {

        expect(httpService).to.be.an('object');
        expect(httpService).to.have.property('get');
        expect(httpService).to.have.property('post');

        describe('#get', function() {
        	this.timeout(5000);

            it('should make a correct get http request', function(done) {
                var uri = 'http://www.google.it';

                httpService.get(uri, function(err, res, body) {
                	if (err) throw err;
                	expect(res).to.be.an('object');
                	expect(res).to.have.property('statusCode');
                	expect(res.statusCode).to.be.equal(200);

                	expect(res).to.have.property('request');
                	expect(res.request.method).to.be.equal('GET');

                	expect(body).to.be.a('string');
                	done();
                });
            });
        });

        describe('#post', function() {
        	this.timeout(5000);

            it('should make a correct post http request. Accept a data argument', function(done) {
                var uri = 'http://www.google.it';
                var data = {
                	data : 'fake data dude'
                };

                httpService.post(uri, data, function(err, res, body) {
                	if (err) throw err;
                	expect(res).to.be.an('object');
                	expect(res).to.have.property('statusCode');
                	expect(res.statusCode).to.be.equal(405);

                	expect(res).to.have.property('request');
                	expect(res.request.method).to.be.equal('POST');
                	expect(body).to.be.a('string');
                	done();
                });
            });
        });
    });
});