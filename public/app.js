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
                templateUrl: "node-pg-ngMaterial-mapgl-template/public/app/templates/map.html",
                //resolve: {
                //    // inject user into map before controller loads
                //    user: function (userService) {
                //        return userService.getUser().then(function(user){
                //            //return user;
                //        })
                //    }
                //}
                //,
                controller: 'MapCtrl'
            })
            .state('login', {
                url: "/login",
                templateUrl: "node-pg-ngMaterial-mapgl-template/public/app/templates/login.html",
                controller: 'LoginCtrl'
            });

        // use the HTML5 History API to remove the #hash in the URL
        $locationProvider.html5Mode(true);

        //jwtInterceptorProvider.tokenGetter = function() {
        //    return localStorage.getItem('id_token');
        //};

        //$httpProvider.interceptors.push(function ($q, $location,jwtHelper) {
        //    return {
        //        response: function (response) {
        //            // do something on success
        //            $location.url('/map/@14.1394,32.9774,1.96');
        //            return response;
        //        }, responseError: function (response) {
        //            if (response.status === 304) $location.url('/login');
        //            return $q.reject(response);
        //        }
        //    };
        //});
    }).run(function($q, userService, jwtHelper, $rootScope){

    })
