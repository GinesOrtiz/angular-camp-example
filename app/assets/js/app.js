'use strict';
var apiBase = 'http://api.seriedb.com/';
var apiPath = {
    search: 'search/movie/:query/en/:page/all.js'
};

function buildURL(path, regex) {
    if (regex) {
        var finalUrl = apiPath[path];
        angular.forEach(regex, function(param, key){
            var regExp = new RegExp(':'+key);
            finalUrl = finalUrl.replace(regExp, param);
        });
        return apiBase + finalUrl;
    }
    return apiBase + apiPath[path];
}

function tmpData($rootScope) {
    var tmpDataObject = {};
    $rootScope.tmpData = function (method, key, value) {
        switch (method) {
            case 'add' :
                tmpDataObject[key] = value;
                break;
            case 'remove' :
                delete tmpDataObject[key];
                break;
            case 'get' :
                return tmpDataObject[key];
        }
    };
}
(function () {
    'use strict';
    angular
        .module('angularJS-Vitamin', [
            'ui.router',
            'permission',
            'ngAnimate',
            'ngStorage',
            'angular-loading-bar',
            'ngSanitize',

            'angularJS-Vitamin.home',
            'angularJS-Vitamin.components'
        ])
        .config(appConfig)
        .run(appRun);


    appConfig.$invoke = ['$locationProvider', 'cfpLoadingBarProvider', '$urlRouterProvider'];
    function appConfig($locationProvider, cfpLoadingBarProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get('$state');
            $state.transitionTo('home');
        });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        cfpLoadingBarProvider.includeSpinner = false;
    }

    appRun.$invoke = ['$rootScope'];
    function appRun($rootScope) {
        $rootScope.$on('$stateChangeSuccess', function (event, args) {
            $rootScope.layoutTemplate = {
                path: '/layouts/' + args.data.template + '.html',
                slug: args.data.template
            };
        });

        /* global tmpData */
        tmpData($rootScope);
    }
}());
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
(function () {
    'use strict';
    angular
        .module('angularJS-Vitamin.home', [])
        .config(HomeConfig);

    HomeConfig.$invoke = ['$stateProvider'];
    function HomeConfig($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/features/home/landing/landing.tpl.html',
                data: {
                    template: 'empty'
                }
            })
            .state('results', {
                url: '/search/:query/:page',
                templateUrl: '/features/home/results/results.tpl.html',
                controller: 'ResultsController',
                data: {
                    template: 'complex'
                },
                resolve : {
                    results : function($stateParams, HomeFactory){
                        return HomeFactory.search($stateParams.query, $stateParams.page);
                    }
                }
            });
    }
}());

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
(function () {
    'use strict';
    angular
        .module('angularJS-Vitamin.home')
        .controller('MovieCardComponentController', MovieCardComponentController);

    MovieCardComponentController.$invoke = ['$scope'];
    function MovieCardComponentController($scope) {

    }
}());
(function () {
    'use strict';
    angular
        .module('angularJS-Vitamin.components')
        .controller('SearchComponentController', SearchComponentController);

    SearchComponentController.$invoke = ['$scope', '$state'];
    function SearchComponentController($scope, $state) {
        $scope.movieTitle = null;
        $scope.searchMovie = function () {
            $state.go('results', {query: $scope.movieTitle, page: 0});
        };
    }
}());
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