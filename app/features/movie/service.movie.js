(function () {
    'use strict';
    angular
        .module('angularJS-Vitamin.movie')
        .factory('MovieFactory', MovieFactory);

    MovieFactory.$invoke = ['$http', '$q'];
    function MovieFactory($http, $q) {
        return {
            getMovieInfo: function (movieId) {
                var dfd = $q.defer();
                $http
                    .get(buildURL('movieInfo', {movieId: movieId}))
                    .then(function (response) {
                        dfd.resolve(response.data);
                    }, function (err) {
                        dfd.reject(err);
                    });
                return dfd.promise;
            },
            getMovieGallery: function (movieId) {
                var dfd = $q.defer();
                $http
                    .get(buildURL('movieGallery', {movieId: movieId}))
                    .then(function (response) {
                        dfd.resolve(response.data);
                    }, function (err) {
                        dfd.reject(err);
                    });
                return dfd.promise;
            }
        };
    }
}());