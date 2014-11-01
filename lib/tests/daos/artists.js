var expect = require('expect.js');
var ArtistDao = require(__dirname + '/../../daos/artist.js');

describe('ArtistDao', function() {
    it('is an object used to retrieve artist\'s information from remote endpoint', function() {
        var artistDao = new ArtistDao();

        expect(artistDao).to.be.an('object');
        expect(artistDao).to.have.property('getArtistBySlug');
        expect(artistDao).to.have.property('getAllArtists');
        expect(artistDao).to.have.property('getArtistsByGenre');
        expect(artistDao).to.have.property('getArtistsByTag');
        expect(artistDao).to.have.property('getArtistsGenres');

        describe('#getArtistBySlug', function() {
            it('should return a single artist object', function(done) {
                var slug = 'adele-e-il-mare';

                artistDao.getArtistBySlug('adele-e-il-mare', function(err, data) {
                    if (err) throw err;

                    var data = JSON.parse(data);

                    expect(data).to.be.an('object');
                    expect(data.status).to.be('ok');
                    expect(data.artist).to.be.an('object');
                    expect(data.artist.artist_slug).to.be.equal(slug);
                    done();
                });

            });
        });

        describe('#getAllArtists', function() {
            it('should return an array of artists', function(done) {
                var criteria = {
                    count: 24,
                    page: 1
                };

                artistDao.getAllArtists(criteria, function(err, data) {
                    if (err) throw err;

                    var data = JSON.parse(data);

                    expect(data).to.be.an('object');
                    expect(data.status).to.be('ok');
                    expect(data.artists).to.be.an('array');
                    done();
                });
            });
        });

        describe('#getArtistsByGenre', function() {
            it('should return all artists within a particular genre', function(done) {
                var slug = 'rock';
                var criteria = {
                    count: 24,
                    page: 1
                };

                artistDao.getArtistsByGenre(slug, criteria, function(err, data) {
                    if (err) throw err;

                    var data = JSON.parse(data);

                    expect(data).to.be.an('object');
                    expect(data.status).to.be('ok');
                    expect(data.artists).to.be.an('array');
                    done();
                });
            });
        });

        describe('#getArtistsByTag', function() {
            it('should return all artists within a specific tag', function(done) {
                var slug = 'pop';
                var criteria = {
                    count: 24,
                    page: 1
                };

                artistDao.getArtistsByTag(slug, criteria, function(err, data) {
                    if (err) throw err;

                    var data = JSON.parse(data);

                    expect(data).to.be.an('object');
                    expect(data.status).to.be('ok');
                    expect(data.artists).to.be.an('array');
                    done();
                });
            });
        });

        describe('#getArtistsGenres', function() {
            it('should return all artists genres', function(done) {
                artistDao.getArtistsGenres(function(err, data) {
                    if (err) throw err;

                    var data = JSON.parse(data);

                    expect(data).to.be.an('object');
                    expect(data.status).to.be('ok');
                    expect(data.genres).to.be.an('array');
                    done();
                });
            });
        });
    });
});
