(function () {
    'use strict';
    angular
        .module('angularJS-Vitamin.home')
        .controller('ResultsController', ResultsController);

    ResultsController.$invoke = ['$scope', 'results'];
    function ResultsController($scope, results) {
        $scope.results = results;
    }
}());