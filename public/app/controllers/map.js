angular.module('myApp')
    .controller('MapCtrl', function ($state, $stateParams, $scope, $http, $rootScope, dataService, ACCESS_TOKEN, $mdSidenav, $mdUtil, $log) {

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

        console.log($stateParams);

        $scope.title = 'Sample Angular Node App!!';

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
            style: 'mapbox://styles/mapbox/bright-v9',
            center: [-0.15591514, 51.51830379],
            zoom: 0
        });

        map.on('load', function () {
            // add layer source
            //map.addSource('tjk', tjksource);
            //map.addLayer(tjkoutline);
            // add layer
            map.addSource('ftfzoi', ftfzoisource);
            map.addLayer(ftfzoilayer);
        });

        map.on('click', function (e) {

            $scope.toggleLeft();

            var features = map.queryRenderedFeatures(e.point, {
                layers: ['ftfzoilayer'] ,
                radius: 10,
                includeGeometry: true
            });

            if (!features.length){
                return;
            }

            console.log(features);
        });

        map.on('move', function (e){
            var lat = map.getCenter().lat.toFixed(4);
            var lng = map.getCenter().lng.toFixed(4);
            var zoom = map.getZoom().toFixed(2);

            if ($stateParams.lat !== lat || $stateParams.lng !== lng || $stateParams.zoom !== zoom) {
                $stateParams.lat = lat;
                $stateParams.lng = lng;
                $stateParams.zoom = zoom;
                $state.go('map', $stateParams, {
                    // prevent the events onStart and onSuccess from firing
                    notify: false,
                    // prevent reload of the current state
                    reload: false,
                    // replace the last record when changing the params so you don't hit the back button and get old params
                    location: 'replace',
                    // inherit the current params on the url
                    inherit: true
                })
            }
        })
    });
