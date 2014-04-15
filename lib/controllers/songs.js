var SongDao = require('../daos/song.js');


/**
 * Return a list of songs.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {string}
 */
exports.getAllSongs = function(req, res, next) {
    var count = req.query.count || 24;
    var page = req.query.page || 1;
    var divide = req.query.divide;
    var song = new SongDao();

    song.getAllSongs(count, page, divide, function(err, data) {
        if (err) {
            return next(err);
        }

        res.send(JSON.parse(data));
    });
};


/**
 * Return all songs within a genre.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {string}
 */
exports.getSongsByGenre = function(req, res, next) {
    var slug = req.param('slug');
    var count = req.query.count || 24;
    var page = req.query.page || 1;
    var divide = req.query.divide;
    var song = new SongDao();

    song.getSongsByGenre(slug, count, page, divide, function(err, data) {
        if (err) {
            return next(err);
        }

        res.send(JSON.parse(data));
    });
};


/**
 * Return all songs within a tag.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {string}
 */
exports.getSongsByTag = function(req, res, next) {
    var slug = req.param('slug');
    var count = req.query.count || 24;
    var page = req.query.page || 1;
    var divide = req.query.divide;
    var song = new SongDao();

    song.getSongsByTag(slug, count, page, divide, function(err, data) {
        if (err) {
            return next(err);
        }

        res.send(JSON.parse(data));
    });
};

/**
 * Return a specific song.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {string}
 */
exports.getSongBySlug = function(req, res, next) {
    var slug = req.param('slug');
    var song = new SongDao();

    song.getSongBySlug(slug, function(err, data) {
        if (err) {
            return next(err);
        }

        res.send(JSON.parse(data));
    });
};


/**
 * Return all song's genres.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {string}
 */
exports.getSongsGenres = function(req, res, next) {
    var song = new SongDao();
    
    song.getSongsGenres(function(err, data) {
        if (err) {
            return next(err);
        }

        res.send(JSON.parse(data));
    });
};
