angular.module('myApp').controller('LoginCtrl', function ($scope, stateService, userService, $timeout, $mdSidenav, $log, $mdUtil, $mdMedia) {
    $scope.title = "kickstart";

    $scope.stateService = stateService;

    $scope.submit = function(strategy){
        $("#login-" + strategy).submit();
    }

})