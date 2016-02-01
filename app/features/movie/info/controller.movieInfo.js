(function () {
    'use strict';
    angular
        .module('angularJS-Vitamin.movie')
        .controller('MovieInfoController', MovieInfoController);

    MovieInfoController.$inject = ['$scope', 'movie'];
    function MovieInfoController($scope, movie) {
        $scope.movie = movie;
        $scope.imageLarge = 'https://image.tmdb.org/t/p/w500';
    }
}());