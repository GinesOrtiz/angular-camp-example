(function () {
    'use strict';
    angular
        .module('angularJS-Vitamin.movie')
        .controller('MovieInfoComplexController', MovieInfoComplexController);

    MovieInfoComplexController.$inject = ['$scope', 'movieInfo'];
    function MovieInfoComplexController($scope, movieInfo) {
        $scope.movie = movieInfo.info;
        $scope.similar = movieInfo.similar;
        $scope.imageLarge = 'https://image.tmdb.org/t/p/w500';
    }
}());