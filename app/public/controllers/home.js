angular.module('myApp')

    .controller('HomeCtrl', function ($scope,$http,$rootScope,dataService, ACCESS_TOKEN) {

        $scope.title = 'Sample Angular Node App!!';

        mapboxgl.accessToken = ACCESS_TOKEN;

        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v8',
            center: [-0.15591514, 51.51830379],
            zoom: 0
        });

        // get data for geojson ccsource
        // $http.get('/public/gadm_adm0.json', { cache: true })
        //    .success(function (response) {
        //
        //        var sourceObj = new mapboxgl.GeoJSONSource({ data: response }); // create source object
        //        //map.addSource('gadm0', sourceObj); // add source
        //
        //
        //        //map.once('load', function () {
        //        if(map.loaded()){
        //            map.addSource('gadm0', sourceObj);
        //            map.addLayer(layer);
        //        } else {
        //            map.once('load', function () {
        //                map.addSource('gadm0', sourceObj);
        //                map.addLayer(layer);
        //            });
        //        }
        //        //});
        //
        //    })
        //    .error(function (error) {
        //        console.log(error);
        //    });

        var gadm0source = {
            "alias": "gadm0",
            "label": "Gadm 2014",
            "tiles": ["http://v10.investmentmapping.org/vector-tiles/gadm0/{z}/{x}/{y}.pbf"],
            "type": "vector",
            "active": false
        };

        var gadm1source = {
            "alias": "gadm1",
            "label": "Gadm 2014",
            "tiles": ["http://v10.investmentmapping.org/vector-tiles/gadm1/{z}/{x}/{y}.pbf"],
            "type": "vector",
            "active": false
        };

        var gadm2source = {
            "alias": "gadm2",
            "label": "Gadm 2014",
            "tiles": ["http://v10.investmentmapping.org/vector-tiles/gadm2/{z}/{x}/{y}.pbf"],
            "type": "vector",
            "active": false
        };

        var gadm3source = {
            "alias": "gadm3",
            "label": "Gadm 3 2014",
            "tiles": ["http://v10.investmentmapping.org/vector-tiles/gadm3/{z}/{x}/{y}.pbf"],
            "type": "vector",
            "active": false
        };

        var gadm0outline = {
            "id": "gadm0outline",
            "layout": {
                "visibility": "visible"
            },
            "source": "gadm0",
            "source-layer":"adm0",
            "interactive": true,
            "type": "line",
            "paint": {
                "line-color": "#f89830",
                "line-opacity": 1,
                "line-width": 1
            }
        };

        var gadm0layer = {
            "id": "gadm0layer",
            "layout": {
                "visibility": "visible"
            },
            "source": "gadm0",
            "source-layer":"adm0",
            "interactive": true,
            "type": "fill",
            "paint": {
                "fill-color": "#0c898d",
                "fill-opacity": .5
            }
        };

        var gadm1layer = {
            "id": "gadm1layer",
            "layout": {
                "visibility": "visible"
            },
            "source": "gadm1",
            "source-layer":"adm1",
            "interactive": true,
            "type": "fill",
            "paint": {
                "fill-color": "#0c898d",
                "fill-opacity": .5
            }
        };

        var gadm1loutline = {
            "id": "gadm1outline",
            "layout": {
                "visibility": "visible"
            },
            "source": "gadm1",
            "source-layer":"adm1",
            "interactive": true,
            "type": "line",
            "paint": {
                "line-color": "#f89830",
                "line-opacity": 1,
                "line-width": 1
            }
        };

        var gadm2layer = {
            "id": "gadm2layer",
            "layout": {
                "visibility": "visible"
            },
            "source": "gadm2",
            "source-layer":"adm2",
            "interactive": true,
            "type": "fill",
            "paint": {
                "fill-color": "#355c82",
                "fill-opacity": .5
            }
        };

        var gadm2loutline = {
            "id": "gadm2outline",
            "layout": {
                "visibility": "visible"
            },
            "source": "gadm2",
            "source-layer":"adm2",
            "interactive": true,
            "type": "line",
            "paint": {
                "line-color": "#ff0000",
                "line-opacity": 1,
                "line-width": 1
            }
        };

        var gadm3layer = {
            "id": "gadm3layer",
            "layout": {
                "visibility": "visible"
            },
            "source": "gadm3",
            "source-layer":"adm3",
            "interactive": true,
            "type": "fill",
            "paint": {
                "fill-color": "#f89830",
                "fill-opacity":.5
            }
        };

        var gadm3loutline = {
            "id": "gadm3outline",
            "layout": {
                "visibility": "visible"
            },
            "source": "gadm3",
            "source-layer":"adm3",
            "interactive": true,
            "type": "line",
            "paint": {
                "line-color": "#000099",
                "line-opacity": 1,
                "line-width": 1
            }
        };

        map.once('load', function () {
            map.batch(function(batch){
                batch.addSource('gadm0', gadm0source);
                batch.addSource('gadm1', gadm1source);
                batch.addSource('gadm2', gadm2source);
                batch.addSource('gadm3', gadm3source);
            });

            map.batch(function(batch){
                // batch.addLayer(gadm0layer);
                batch.addLayer(gadm0outline);
                // batch.addLayer(gadm1layer);
                batch.addLayer(gadm1loutline, "gadm0outline");
                //batch.addLayer(gadm2layer, "gadm0layer");
                batch.addLayer(gadm2loutline, "gadm1outline");
                // batch.addLayer(gadm3layer);
                batch.addLayer(gadm3loutline, "gadm2outline");
            });
        });

        map.on('click', function (e) {

            // Use layer option to avoid getting results from other layers
            map.featuresAt(e.point, {
                layer: "gadm2layer",
                radius: 10,
                includeGeometry: true
            }, function (err, features) {
                if (err) {
                    throw err;
                }

                // if there are features within the given radius of the click event,
                if (features.length) {
                    console.log(features);
                }
            });
        });

        map.on('zoom', function(e){
           console.log(map.getZoom());
        });

        //var chapters = {
        //    'baker': {
        //        bearing: 27,
        //        center: [-0.15591514, 51.51830379],
        //        zoom: 15.5,
        //        pitch: 20
        //    },
        //    'aldgate': {
        //        duration: 6000,
        //        center: [-0.07571203, 51.51424049],
        //        bearing: 150,
        //        zoom: 15,
        //        pitch: 0
        //    },
        //    'london-bridge': {
        //        bearing: 90,
        //        center: [-0.08533793, 51.50438536],
        //        zoom: 13,
        //        speed: 0.6,
        //        pitch: 40
        //    },
        //    'woolwich': {
        //        bearing: 90,
        //        center: [0.05991101, 51.48752939],
        //        zoom: 12.3
        //    },
        //    'gloucester': {
        //        bearing: 45,
        //        center: [-0.18335806, 51.49439521],
        //        zoom: 15.3,
        //        pitch: 20,
        //        speed: 0.5
        //    },
        //    'caulfield-gardens': {
        //        bearing: 180,
        //        center: [-0.19684993, 51.5033856],
        //        zoom: 12.3
        //    },
        //    'telegraph': {
        //        bearing: 90,
        //        center: [-0.10669358, 51.51433123],
        //        zoom: 17.3,
        //        pitch: 40
        //    },
        //    'charing-cross': {
        //        bearing: 90,
        //        center: [-0.12416858, 51.50779757],
        //        zoom: 14.3,
        //        pitch: 20
        //    }
        //};
        //
        //// On every scroll event, check which element is on screen
        //
        //    $('#features').scroll(function() {
        //    var chapterNames = Object.keys(chapters);
        //    for (var i = 0; i < chapterNames.length; i++) {
        //        var chapterName = chapterNames[i];
        //        if (isElementOnScreen(chapterName)) {
        //            setActiveChapter(chapterName);
        //            break;
        //        }
        //    }
        //});
        //
        //var activeChapterName = 'baker';
        //function setActiveChapter(chapterName) {
        //    if (chapterName === activeChapterName) return;
        //
        //    map.flyTo(chapters[chapterName]);
        //
        //    document.getElementById(chapterName).setAttribute('class', 'active');
        //    document.getElementById(activeChapterName).setAttribute('class', '');
        //
        //    activeChapterName = chapterName;
        //}
        //
        //function isElementOnScreen(id) {
        //    var element = document.getElementById(id);
        //    var bounds = element.getBoundingClientRect();
        //    return bounds.top < 350 && bounds.bottom > 250;
        //}
    });
