'use strict';

var apiBase = 'http://api.seriedb.com/';
var apiPath = {
    search: 'search/movie/:query/en/:page/all.js',
    movieInfo: 'movie/info/:movieId/en/all.js',
    movieSimilar: 'movie/similar/:movieId/en/all.js',
    movieGallery: 'movie/images/:movieId/en/all.js'
};

function buildURL(path, regex) {
    if (regex) {
        var finalUrl = apiPath[path];
        angular.forEach(regex, function (param, key) {
            var regExp = new RegExp(':' + key);
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
            'angularJS-Vitamin.movie',
            'angularJS-Vitamin.components'
        ])
        .config(appConfig)
        .run(appRun);


    appConfig.$inject = ['$locationProvider', 'cfpLoadingBarProvider', '$urlRouterProvider'];
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

    appRun.$inject = ['$rootScope'];
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

    HomeConfig.$inject = ['$stateProvider'];
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
        .module('angularJS-Vitamin.movie', [])
        .config(HomeConfig);

    HomeConfig.$inject = ['$stateProvider'];
    function HomeConfig($stateProvider) {
        $stateProvider
            .state('movieInfo', {
                url: '/movie/:id',
                templateUrl: '/features/movie/info/info.tpl.html',
                controller: 'MovieInfoController',
                data: {
                    template: 'complex'
                },
                resolve: {
                    movie: function ($stateParams, MovieFactory) {
                        return MovieFactory.getMovieInfo($stateParams.id);
                    }
                }
            })
            .state('movieInfoComplex', {
                url: '/movie/:id/all',
                templateUrl: '/features/movie/infoComplex/infoComplex.tpl.html',
                controller: 'MovieInfoComplexController',
                data: {
                    template: 'complex'
                },
                resolve: {
                    movieInfo: function ($stateParams, MovieFactory) {
                        return MovieFactory.getAllMovieInfo($stateParams.id);
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
(function () {
    'use strict';
    angular
        .module('angularJS-Vitamin.movie')
        .factory('MovieFactory', MovieFactory);

    MovieFactory.$inject = ['$http', '$q'];
    function MovieFactory($http, $q) {
        return {
            getMovieInfo: function (movieId) {
                return $http
                    .get(buildURL('movieInfo', {movieId: movieId}))
                    .then(function (response) {
                        return response.data;
                    });
            },
            getMovieSimilar: function (movieId) {
                return $http
                    .get(buildURL('movieSimilar', {movieId: movieId}))
                    .then(function (response) {
                        return response.data;
                    });
            },
            getAllMovieInfo: function (movieId) {
                return $q.all({
                    info: this.getMovieInfo(movieId),
                    similar: this.getMovieSimilar(movieId)
                });
            }
        };
    }
}());
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
(function () {
    'use strict';
    angular
        .module('angularJS-Vitamin.home')
        .controller('ResultsController', ResultsController);

    ResultsController.$inject = ['$scope', 'results'];
    function ResultsController($scope, results) {
        $scope.results = results;
    }
}());
(function () {
    'use strict';
    angular
        .module('angularJS-Vitamin.movie')
        .controller('MovieInfoController', MovieInfoController);

    MovieInfoController.$inject = ['$scope', 'movie'];
    function MovieInfoController($scope, movie) {
        $scope.movie = movie;
        $scope.imageLarge = 'https://image.tmdb.org/t/p/w500';
    }
}());
(function () {
    'use strict';
    angular
        .module('angularJS-Vitamin.movie')
        .controller('MovieInfoComplexController', MovieInfoComplexController);

    MovieInfoComplexController.$inject = ['$scope', 'movieInfo'];
    function MovieInfoComplexController($scope, movieInfo) {
        $scope.movie = movieInfo.info;
        $scope.similar = movieInfo.similar;
        $scope.imageLarge = 'https://image.tmdb.org/t/p/w500';
    }
}());