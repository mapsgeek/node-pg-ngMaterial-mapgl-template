'use strict';


// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute', 'ngMaterial', 'myApp.config', 'ui.router', 'http-auth-interceptor'
]).
    config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

        $urlRouterProvider.otherwise("/map/@47.6201,-122.3519,9.34");

        $stateProvider
            .state('map', {
                url: "/map/@{lat},{lng},{zoom}?left-panel&right-panel",
                //url: "/map",
                templateUrl: "app/templates/map.html",
                controller: 'MapCtrl'
            })
            .state('login', {
                url: "/login",
                templateUrl: "app/templates/login.html",
                controller: 'LoginCtrl'
            });

        // use the HTML5 History API to remove the #hash in the URL
        $locationProvider.html5Mode(true);

        $httpProvider.interceptors.push(function ($q, $location) {
            return {
                response: function (response) {
                    // do something on success
                    return response;
                }, responseError: function (response) {
                    if (response.status === 302) $location.url('/login');
                    return $q.reject(response);
                }
            };
        });
    });
