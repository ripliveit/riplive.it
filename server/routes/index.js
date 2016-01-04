var controllers = require('../controllers');


/**
 * Exports all routes (defined in alphabetical order).
 *
 * @param  {Object} app
 * @return {Object}
 */
module.exports = (app) => {   
    app.get('/api/artists', controllers.artists.getAllArtists);
    app.get('/api/artists/:slug', controllers.artists.getArtistBySlug);
    app.get('/api/artists/genre/:slug', controllers.artists.getArtistsByGenre);
    app.get('/api/artists/tag/:slug', controllers.artists.getArtistsByTag);

    app.get('/api/authors', controllers.authors.getAllAuthors);
    app.get('/api/authors/:slug', controllers.authors.getAuthorBySlug);

    app.get('/api/charts', controllers.charts.getAllCompleteCharts);
    app.get('/api/charts/latest', controllers.charts.getLatestCompleteCharts);
    app.get('/api/charts/:slug', controllers.charts.getCompleteChartBySlug);
    app.get('/api/charts/complete/:slug', controllers.charts.getAllCompleteChartsByChartType);
    app.post('/api/charts/vote', controllers.charts.insertCompleteChartVote);

    app.get('/api/highlights', controllers.highlights.getHighlights);

    app.get('/api/genres/songs', controllers.songs.getSongsGenres);
    app.get('/api/genres/artists', controllers.artists.getArtistsGenres);

    app.get('/api/news', controllers.news.getAllNews);
    app.get('/api/news/:slug', controllers.news.getNewsBySlug);
    app.get('/api/categories/:slug', controllers.news.getNewsByCategory);
    app.get('/api/tags/:slug', controllers.news.getNewsByTag);

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

    app.get('/sitemap.xml', controllers.seo.getSiteMap);

    app.get('*', controllers.index.render);
};
