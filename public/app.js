'use strict';


// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute','ngMaterial', 'myApp.config' ,'ui.router'
]).
    config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/map");

        $stateProvider
            .state('map', {
                url: "/map/@{lat},{lng},{zoom}",
                //url: "/map",
                templateUrl: "app/templates/map.html",
                controller: 'MapCtrl'
            })

        // use the HTML5 History API to remove the #hash in the URL
        $locationProvider.html5Mode(true);
    });
