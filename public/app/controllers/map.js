angular.module('myApp')
    .controller('MapCtrl', function ($state, $stateParams, $scope, $http, $rootScope,
                                     dataService, mapService, stateService, userService, ACCESS_TOKEN, $mdSidenav, $mdUtil, $log) {

        mapboxgl.accessToken = ACCESS_TOKEN;

        // var source = {
        //     "tiles": ["http://spatialserver.spatialdev.com/services/vector-tiles/regional_capitals/{z}/{x}/{y}.pbf"],
        //     "type": "vector"
        // };

        // var layer = {
        //     "id": "eth_regional_capital",
        //     "layout": {
        //         "visibility": "visible"
        //     },
        //     "source": "source",
        //     "source-layer": "Regional_capital",
        //     "interactive": true,
        //     "type": "circle",
        //     "paint": {
        //         "circle-color": "red"
        //     }
        // };

        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/spatialdev/cir5jc4rr0002btm346pmvyi8'
        });

        mapService.init(map);

        map.on('load', function () {
            // map.addSource('source', source);
            // map.addLayer(layer);
        });

        map.on('click', function (e) {

            $scope.itcprojects=[];
            $scope.sdprojects=[];

            var features = map.queryRenderedFeatures(e.point, {
                layers: ["all_countries"],
                radius: 10,
                includeGeometry: true
            });

            if (features.length>0) {
                $scope.open('right');
                $scope.details = features[0];
                console.log($scope.details)
                $scope.itcprojects=$scope.details.properties["ITC_ProjectName"].split("|");
                $scope.sdprojects=$scope.details.properties["SD_ProjectName"].split("|");
            }
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
