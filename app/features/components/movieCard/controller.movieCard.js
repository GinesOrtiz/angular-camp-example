(function () {
    'use strict';
    angular
        .module('angularJS-Vitamin.home')
        .controller('MovieCardComponentController', MovieCardComponentController);

    MovieCardComponentController.$inject = ['$scope'];
    function MovieCardComponentController($scope) {
        $scope.imageThumb = 'https://image.tmdb.org/t/p/w500_and_h281_bestv2';
        $scope.imageLarge = 'https://image.tmdb.org/t/p/w500';
    }
}());