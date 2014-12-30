var ArtistDao = require('../daos/artist.js');
var artist = new ArtistDao();

/**
 * Return a list of artists.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getAllArtists = function(req, res, next) {
    var criteria = {
        count: req.query.count || 24,
        page: req.query.page || 1,
        divide: req.query.divide
    };

    artist.getAllArtists(criteria, function(err, data) {
        if (err) return next(err);
        
        res.send(JSON.parse(data));
    });
};

/**
 * Return a specific artist.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getArtistBySlug = function(req, res, next) {
    var slug = req.param('slug');

    artist.getArtistBySlug(slug, function(err, data) {
        if (err) return next(err);
        
        res.send(JSON.parse(data));
    });
};

/**
 * Return a list of artists,
 * grabbed by their genre.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getArtistsByGenre = function(req, res, next) {
    var slug = req.param('slug');
    var criteria = {
        count: req.query.count || 24,
        page: req.query.page || 1,
        divide: req.query.divide
    };

    artist.getArtistsByGenre(slug, criteria, function(err, data) {
        if (err) return next(err);
        
        res.send(JSON.parse(data));
    });
};

/**
 * Return a list of artists,
 * grabbed by their tags.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getArtistsByTag = function(req, res, next) {
    var slug = req.param('slug');
    var criteria = {
        count: req.query.count || 24,
        page: req.query.page || 1,
        divide: req.query.divide
    };

    artist.getArtistsByTag(slug, criteria, function(err, data) {
        if (err) return next(err);

        res.send(JSON.parse(data));
    });
};

/**
 * Return all artists's genres.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getArtistsGenres = function(req, res, next) {
    artist.getArtistsGenres(function(err, data) {
        if (err) return next(err);

        res.send(JSON.parse(data));
    });
};
