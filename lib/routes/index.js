var controllers = require('../controllers');
var auth = require('../services/auth.js');

/**
 * Exports all routes (defined in alphabetical order).
 *
 * @param  {Object} app
 * @return {Object}
 */
module.exports = function(app) {
    app.get('/api/artists', controllers.artists.getAllArtists);
    app.get('/api/artists/:slug', controllers.artists.getArtistBySlug);
    app.get('/api/artists/genre/:slug', controllers.artists.getArtistsByGenre);
    app.get('/api/artists/tag/:slug', controllers.artists.getArtistsByTag);

    app.get('/api/authors', controllers.authors.getAllAuthors);
    app.get('/api/authors/:slug', controllers.authors.getAuthorBySlug);

    app.get('/api/auth/facebook', controllers.auth.authFacebook);
    app.get('/api/auth/facebook/callback', auth.authenticate('facebook', {
        successRedirect: '/api/auth/success',
        failureRedirect: '/api/auth/failure'
    }));

    app.get('/api/auth/success', controllers.auth.success);
    app.get('/api/auth/failure', controllers.auth.failure);

    app.get('/api/charts', controllers.charts.getAllCompleteCharts);
    app.get('/api/charts/:slug', controllers.charts.getCompleteChartBySlug);
    app.get('/api/charts/complete/:slug', controllers.charts.getAllCompleteChartsByChartSlug);
    app.post('/api/charts/vote', controllers.charts.insertCompleteChartVote);

    app.get('/api/highlights', controllers.highlights.getHighlights);

    app.get('/api/genres/songs', controllers.songs.getSongsGenres);
    app.get('/api/genres/artists', controllers.artists.getArtistsGenres);

    app.get('/api/labels', controllers.labels.getAllLabels);
    app.get('/api/labels/:slug', controllers.labels.getLabelBySlug);
    app.get('/api/labels/genre/:slug', controllers.labels.getLabelsByGenre);

    app.get('/api/news', controllers.news.getAllNews);
    app.get('/api/news/:slug', controllers.news.getNewsBySlug);
    app.get('/api/tags/:slug', controllers.news.getNewsByTag);
    app.get('/api/categories/:slug', controllers.news.getNewsByCategory);

    app.get('/api/podcasts', controllers.podcasts.getAllPodcasts);
    app.get('/api/podcasts/:program_slug', controllers.podcasts.getAllPodcastsByProgramSlug);
    app.get('/api/podcasts/:program_slug/:id', controllers.podcasts.getPodcastById);

    app.get('/api/programs', controllers.programs.getAllPrograms);
    app.get('/api/programs/:slug', controllers.programs.getProgramBySlug);

    app.get('/api/schedule', controllers.programs.getProgramsSchedule);
    app.get('/api/search', controllers.search.getSearchResults);

    app.get('/api/songs', controllers.songs.getAllSongs);
    app.get('/api/songs/:slug', controllers.songs.getSongBySlug);
    app.get('/api/songs/genre/:slug', controllers.songs.getSongsByGenre);
    app.get('/api/songs/tag/:slug', controllers.songs.getSongsByTag);

    app.get('/api/users/:uuid', controllers.users.getUserByUuid);

    app.get('*', function(req, res, next) {
        var index = app.get('staticFolder') + '/index.html';
        res.sendfile(index);
    });
};
