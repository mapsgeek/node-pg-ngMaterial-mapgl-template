angular.module('myApp').controller('MainCtrl', function ($scope, stateService, $timeout, $mdSidenav, $log, $mdUtil, $mdMedia, $rootScope) {

    $scope.hideToolbars = typeof $rootScope.user == "undefined";

    $scope.title = "ITC Projects";

    $scope.stateService = stateService;

    $scope.leftPanelOpen = $mdMedia('gt-sm');
    $(window).resize(function(){
        $scope.leftPanelOpen = $mdMedia('gt-sm');
    });

    $scope.close = function (id) {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(id).close()
            .then(function () {
                $log.debug("close " + id +" is done");
            });
    };

    $scope.open = function (id) {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(id).open()
            .then(function () {
                $log.debug("open " + id + "is done");
            });
    };

});