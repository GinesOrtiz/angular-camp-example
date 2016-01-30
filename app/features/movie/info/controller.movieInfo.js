(function () {
    'use strict';
    angular
        .module('angularJS-Vitamin.movie')
        .controller('MovieInfoController', MovieInfoController);

    MovieInfoController.$invoke = ['$scope', 'movie'];
    function MovieInfoController($scope, movie) {
        $scope.movie = movie;
    }
}());