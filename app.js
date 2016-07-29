'use strict';


// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute', 'ngMaterial', 'myApp.config', 'ui.router', 'http-auth-interceptor', 'angular-jwt'
]).
    config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, jwtInterceptorProvider) {

        $urlRouterProvider.otherwise("/map/@47,-122,2");

        $stateProvider
            .state('map', {
                url: "/map/@{lat},{lng},{zoom}?left-panel&right-panel",
                //url: "/map",
                templateUrl: "/node-pg-ngMaterial-mapgl-template/app/templates/map.html",
                controller: 'MapCtrl'
            })
            .state('login', {
                url: "/login",
                templateUrl: "/node-pg-ngMaterial-mapgl-template/app/templates/login.html",
                controller: 'LoginCtrl'
            });

        // use the HTML5 History API to remove the #hash in the URL
        $locationProvider.html5Mode(true);

    }).run(function($q, userService, jwtHelper, $rootScope){

    })
