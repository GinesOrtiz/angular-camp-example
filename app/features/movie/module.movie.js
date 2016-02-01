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