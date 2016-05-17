angular.module('myApp')

    .controller('MapCtrl', function ($scope, $http, $rootScope, dataService, ACCESS_TOKEN) {

        $scope.title = 'Sample Angular Node App!!';

        mapboxgl.accessToken = ACCESS_TOKEN;

        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v8',
            center: [-0.15591514, 51.51830379],
            zoom: 0
        });

        var tjksource = {
            "alias": "tjksource",
            "label": "TJK Admin 2",
            "tiles": ["http://pgrestapi.followbox.net/services/vector-tiles/tjk_admin1_2015/{z}/{x}/{y}.pbf"],
            "type": "vector",
            "active": false
        };

        var tjkoutline = {
            "id": "tjkoutline",
            "layout": {
                "visibility": "visible"
            },
            "source": "tjk",
            "source-layer": "tjk_admin1_2015",
            "interactive": true,
            "type": "line",
            "paint": {
                "line-color": "#000099",
                "line-opacity": 1,
                "line-width": 1
            }
        };

        map.once('load', function () {
            // add layer source
            map.addSource('tjk', tjksource);
            // add layer
            map.addLayer(tjkoutline);
        });

        map.on('click', function (e) {
            var features = map.queryRenderedFeatures(e.point, {
                layers: ['tjkoutline'] ,
                radius: 10,
                includeGeometry: true
            });

            if (!features.length){
                return;
            }

            console.log(features);
        });
    });
