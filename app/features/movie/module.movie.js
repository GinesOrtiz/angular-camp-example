(function () {
    'use strict';
    angular
        .module('angularJS-Vitamin.movie', [])
        .config(HomeConfig);

    HomeConfig.$invoke = ['$stateProvider'];
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
            .state('movieGallery', {
                url: '/movie/:id/gallery',
                templateUrl: '/features/movie/gallery/gallery.tpl.html',
                controller: 'MovieGalleryController',
                data: {
                    template: 'complex'
                },
                resolve: {
                    images: function ($stateParams, MovieFactory) {
                        return MovieFactory.getMovieGallery($stateParams.id);
                    }
                }
            });
    }
}());
