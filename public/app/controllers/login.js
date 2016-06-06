angular.module('myApp').controller('LoginCtrl', function ($scope, stateService, $timeout, $mdSidenav, $log, $mdUtil, $mdMedia) {
    $scope.title = "kickstart";

    $scope.stateService = stateService;

})