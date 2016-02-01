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
