(function () {
    'use strict';
    angular
        .module('angularJS-Vitamin.home')
        .factory('HomeFactory', HomeFactory);

    HomeFactory.$inject = ['$http'];
    function HomeFactory($http) {
        return {
            search: function (query, page) {
                return $http
                    .get(buildURL('search', {query: query, page: page + 1}))
                    .then(function (response) {
                        return response.data;
                    });
            }
        };
    }
}());