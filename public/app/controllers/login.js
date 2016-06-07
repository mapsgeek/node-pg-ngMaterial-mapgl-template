angular.module('myApp').controller('LoginCtrl', function ($scope, stateService, userService, $timeout, $mdSidenav, $log, $mdUtil, $mdMedia) {
    $scope.title = "kickstart";

    $scope.stateService = stateService;

    $scope.login = function (strategy) {
        var promise = userService.logIn(strategy);
    };

    $scope.test = function(){
        console.log('test');
    }

})