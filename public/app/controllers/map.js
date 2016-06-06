angular.module('myApp')
    .controller('MapCtrl', function ($state, $stateParams, $scope, $http, $rootScope,
                                     dataService, mapService, stateService, ACCESS_TOKEN, $mdSidenav, $mdUtil, $log) {

        mapboxgl.accessToken = ACCESS_TOKEN;

        var tjksource = {
            "alias": "tjksource",
            "label": "TJK Admin",
            "tiles": ["http://pgrestapi.tajikistanspatial.org/services/vector-tiles/tjk_admin0_2015/{z}/{x}/{y}.pbf"],
            "type": "vector",
            "active": false
        };

        var ftfzoisource = {
            "alias": "ftfzoime",
            "label": "Feed the Future ZOI",
            "tiles": ["http://54.215.8.27/services/postgis/ftf_zoi/geom/vector-tiles/{z}/{x}/{y}.pbf"],
            "type": "vector",
            "active": false
        };

        var ftfzoilayer = {
            "id": "ftfzoilayer",
            "layout": {
                "visibility": "visible"
            },
            "source": "ftfzoi",
            "source-layer": "ftf_zoi_geom",
            "interactive": true,
            "type": "fill",
            "paint": {
                "fill-pattern":"triangle-11"
                //
                //"line-color": "#ff0000",
                //"line-opacity": 1,
                //"line-width": 1
            }
        };

        var tjkoutline = {
            "id": "tjkoutline",
            "layout": {
                "visibility": "visible"
            },
            "source": "tjk",
            "source-layer": "tjk_admin0_2015",
            "interactive": true,
            "type": "background",
            "paint": {
                "background-pattern":"triangle-11"
            }
        };

        //var ruler = cheapRuler(47.669300, 'feet');
        //var distance = ruler.distance([47.6692039,-122.3851412], [47.6694005,-122.3847547]);
        //
        //console.log(distance);

        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/bright-v9'
        });

        mapService.init(map);

        mapService.map.on('load', function () {
            // add layer source
            //map.addSource('tjk', tjksource);
            //map.addLayer(tjkoutline);
            // add layer
            map.addSource('ftfzoi', ftfzoisource);
            map.addLayer(ftfzoilayer);
        });

        mapService.map.on('click', function (e) {

            stateService.toggleParam('left-panel');

            //$scope.toggleLeft();

            //var features = map.queryRenderedFeatures(e.point, {
            //    layers: ['ftfzoilayer'] ,
            //    radius: 10,
            //    includeGeometry: true
            //});
            //
            //if (!features.length){
            //    return;
            //}

            //console.log(features);
        });

    });
