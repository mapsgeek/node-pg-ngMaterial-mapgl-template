angular.module('myApp').controller('MainCtrl', function ($scope, stateService, $timeout, $mdSidenav, $log, $mdUtil, $mdMedia) {
    $scope.title = "kickstart";

    $scope.stateService = stateService;

    $scope.close = function (location) {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(location).close()
            .then(function () {
                $log.debug("close " + location +" is done");
            });
    };

    $scope.open = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('left').open()
            .then(function () {
                $log.debug("open LEFT is done");
            });
    };

    function buildToggler(navID) {
        var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        },200);
        return debounceFn;
    }

    $scope.toggleLeft = buildToggler('left');

    $scope.toggleRight = buildToggler('right');

})