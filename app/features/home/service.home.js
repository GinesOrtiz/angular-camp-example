(function () {
    'use strict';
    angular
        .module('angularJS-Vitamin.home')
        .factory('HomeFactory', HomeFactory);

    HomeFactory.$invoke = ['$http', '$q'];
    function HomeFactory($http, $q) {
        return {
            search: function (query, page) {
                var dfd = $q.defer();
                $http
                    .get(buildURL('search', {query: query, page: page + 1}))
                    .then(function (response) {
                        dfd.resolve(response.data);
                    }, function (err) {
                        dfd.reject(err);
                    });
                return dfd.promise;
            }
        };
    }
}());