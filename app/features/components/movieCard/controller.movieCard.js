(function () {
    'use strict';
    angular
        .module('angularJS-Vitamin.home')
        .controller('MovieCardComponentController', MovieCardComponentController);

    MovieCardComponentController.$invoke = ['$scope'];
    function MovieCardComponentController($scope) {

    }
}());