'use strict';

angular.module('riplive')

/**
 * A service used to persist
 * the vote to remote server storage.
 * Implement a method to check if a user has already
 * voted.
 *
 * @param  {Object} $injector
 * @param  {Object} localStorageService
 * @return {Object}
 */
.service('voteService', function voteService($injector, localStorageService) {
    var ChartVote = $injector.get('chartVote');

    /**
     * Check if a user can vote a song.
     * A user can vote once a day.
     * First attempt to retrieve the vote log's data
     * from local storage.
     * If a vote log is present than checks if
     * vote date is more or less older than 24
     * hours.
     *
     * @param  {Int} idSong Used to retrieve the vote log's
     *                      data from local storage
     * @return {boolean}
     */
    var userCanVoteSong = function(idSong) {
        var song = localStorageService.get(idSong);
        var now = new Date();
        var timeout = now.setDate(now.getDate() - 1);

        if (song) {
            var voteDate = new Date(song.voteDate);

            if (voteDate.getTime() > timeout) {
                return false;
            } else {
                return true;
            }

        } else {
            return true;
        }
    };

    /**
     * Persist a vote to the remote server.
     * Before send the data to the wire
     * check if a user has already voted.
     *
     * @param  {Object}   params An object carryng the song information
     * @param  {Function} cb Fired when date are retrieved from the server.
     * @return {undefined}
     */
    var voteSong = function(params, cb) {
        if (!userCanVoteSong(params.id_song)) {
            return cb({
                status: 'error',
                message: 'You can vote a song once a day!'
            });
        }

        var vote = ChartVote.save(params);
        vote.$promise.then(function(data) {

            // Persist the vote to local storage.
            localStorageService.set(params.id_song, {
                voteDate: new Date()
            });

            cb(data);
        });
    };

    return {
        userCanVoteSong: userCanVoteSong,
        voteSong: voteSong
    };
});
