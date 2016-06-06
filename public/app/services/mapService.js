var app = angular.module("myApp")
    .service("mapService", function ($http, $q, $stateParams, $state, stateService) {

        var mapService = {};

        // initialize the map service
        mapService.init = function (map) {

            // assign the instantiated map to our map variable
            mapService.map = map;

            //set state params if empty
            if ($stateParams.lat === '' || $stateParams.lng === '' || $stateParams.zoom === '' || $stateParams.style === '') {
                $stateParams.lat = $stateParams.lat || 47.6201;
                $stateParams.lng = $stateParams.lng || -122.3519;
                $stateParams.zoom = $stateParams.zoom || 9.34;
            }

            // set map zoom
            mapService.map.setZoom($stateParams.zoom);

            // set the map center
            mapService.map.setCenter([$stateParams.lng, $stateParams.lat]);

            // update the url if it was empty of lat,lng,zoom or style params
            if ($stateParams.lat === '' || $stateParams.lng === '' || $stateParams.zoom === '' || $stateParams.style === '') {
                //$state.go('map', $stateParams, {
                //    // prevent the events onStart and onSuccess from firing
                //    notify: false,
                //    // prevent reload of the current state
                //    reload: false,
                //    // replace the last record when changing the params so you don't hit the back button and get old params
                //    location: 'replace',
                //    // inherit the current params on the url
                //    inherit: true
                //})
                stateService.setState('map', $stateParams);
            }

            //when the map stops moving do this
            mapService.map.on('move', function () {
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
            });
        };

        return mapService;
    });

