(function () {
    'use strict';
    angular
        .module('angularJS-Vitamin.movie')
        .controller('MovieGalleryController', MovieGalleryController);

    MovieGalleryController.$invoke = ['$scope', 'images'];
    function MovieGalleryController($scope, images) {
        $scope.images = images;
    }
}());