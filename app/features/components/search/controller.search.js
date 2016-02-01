(function () {
    'use strict';
    angular
        .module('angularJS-Vitamin.components')
        .controller('SearchComponentController', SearchComponentController);

    SearchComponentController.$inject = ['$scope', '$state'];
    function SearchComponentController($scope, $state) {
        $scope.movieTitle = null;
        $scope.searchMovie = function () {
            $state.go('results', {query: $scope.movieTitle, page: 0});
        };
    }
}());