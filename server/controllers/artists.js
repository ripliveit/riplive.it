'use strict';

const artist = require('../services/artist.js');


/**
 * Return a list of artists.
 *
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Object} next
 * @return {undefined}
 */
exports.getAllArtists = (req, res, next) => {
    const criteria = {
        count: req.query.count || 24,
        page: req.query.page || 1,
        divide: req.query.divide
    };

    artist.getAllArtists(criteria, (err, data) => {
        if (err) return next(err);
        
        try {
            const parsed = JSON.parse(data);

            res.status(parsed.code).send(parsed);
        } catch(e) {
            return next(e);
        }
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
exports.getArtistBySlug = (req, res, next) => {
    const slug = req.params.slug;

    artist.getArtistBySlug(slug, (err, data) => {
        if (err) return next(err);
        
        try {
            const parsed = JSON.parse(data);

            res.status(parsed.code).send(parsed);
        } catch(e) {
            return next(e);
        }
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
exports.getArtistsByGenre = (req, res, next) => {
    const slug = req.params.slug;

    const criteria = {
        count: req.query.count || 24,
        page: req.query.page || 1,
        divide: req.query.divide
    };

    artist.getArtistsByGenre(slug, criteria, (err, data) => {
        if (err) return next(err);
        
        try {
            const parsed = JSON.parse(data);

            res.status(parsed.code).send(parsed);
        } catch(e) {
            return next(e);
        }
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
exports.getArtistsByTag = (req, res, next) => {
    const slug = req.params.slug;

    const criteria = {
        count: req.query.count || 24,
        page: req.query.page || 1,
        divide: req.query.divide
    };

    artist.getArtistsByTag(slug, criteria, (err, data) => {
        if (err) return next(err);

        try {
            var parsed = JSON.parse(data);

            res.status(parsed.code).send(parsed);
        } catch(e) {
            return next(e);
        }
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
exports.getArtistsGenres = (req, res, next) => {
    artist.getArtistsGenres((err, data) => {
        if (err) return next(err);

        try {
            const parsed = JSON.parse(data);

            res.status(parsed.code).send(parsed);
        } catch(e) {
            return next(e);
        }
    });
};
