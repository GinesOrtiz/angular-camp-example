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