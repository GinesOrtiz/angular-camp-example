(function () {
    'use strict';
    angular
        .module('angularJS-Vitamin.components', [])
        .directive('vitSearch', vitSearch)
        .directive('movieCard', movieCard);

    function vitSearch() {
        return {
            restrict: 'E',
            templateUrl: '/features/components/search/search.tpl.html',
            controller: 'SearchComponentController'
        };
    }

    function movieCard() {
        return {
            restrict: 'E',
            scope: {
                movie: '=movie'
            },
            templateUrl: '/features/components/movieCard/movieCard.tpl.html',
            controller: 'MovieCardComponentController'
        };
    }
}());