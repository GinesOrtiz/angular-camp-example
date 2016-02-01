(function () {
    'use strict';
    angular
        .module('angularJS-Vitamin.movie')
        .factory('MovieFactory', MovieFactory);

    MovieFactory.$inject = ['$http', '$q'];
    function MovieFactory($http, $q) {
        return {
            getMovieInfo: function (movieId) {
                return $http
                    .get(buildURL('movieInfo', {movieId: movieId}))
                    .then(function (response) {
                        return response.data;
                    });
            },
            getMovieSimilar: function (movieId) {
                return $http
                    .get(buildURL('movieSimilar', {movieId: movieId}))
                    .then(function (response) {
                        return response.data;
                    });
            },
            getAllMovieInfo: function (movieId) {
                return $q.all({
                    info: this.getMovieInfo(movieId),
                    similar: this.getMovieSimilar(movieId)
                });
            }
        };
    }
}());