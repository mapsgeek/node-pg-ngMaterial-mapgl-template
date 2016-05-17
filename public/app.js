'use strict';


// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute','ngMaterial', 'myApp.config'
]).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/templates/map.html',
                controller: 'MapCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

    }]);
