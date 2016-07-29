'use strict';


// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute', 'ngMaterial', 'myApp.config', 'ui.router', 'http-auth-interceptor', 'angular-jwt'
]).
    config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, jwtInterceptorProvider) {

        $urlRouterProvider.otherwise("/login");

        $stateProvider
            .state('map', {
                url: "/map/@{lat},{lng},{zoom}?left-panel&right-panel",
                //url: "/map",
                templateUrl: "app/templates/map.html",
                //resolve: {
                //    // inject user into map before controller loads
                //    user: function (userService) {
                //        return userService.getUser().then(function(user){
                //            //return user;
                //        })
                //    }
                //}
                //,
                controller: 'MapCtrl'
            })
            .state('login', {
                url: "/login",
                templateUrl: "app/templates/login.html",
                controller: 'LoginCtrl'
            });

        // use the HTML5 History API to remove the #hash in the URL
        $locationProvider.html5Mode(true);

        jwtInterceptorProvider.tokenGetter = function() {
            return localStorage.getItem('id_token');
        };

        $httpProvider.interceptors.push(function ($q, $location,jwtHelper) {
            return {
                response: function (response) {
                    // do something on success
                    $location.url('/map/@14.1394,32.9774,1.96');
                    return response;
                }, responseError: function (response) {
                    if (response.status === 304) $location.url('/login');
                    return $q.reject(response);
                }
            };
        });
    }).run(function($q, userService, jwtHelper, $rootScope){

    })

angular.module('myApp.config', [])

    .constant('ACCESS_TOKEN', 'pk.eyJ1Ijoic3BhdGlhbGRldiIsImEiOiJKRGYyYUlRIn0.PuYcbpuC38WO6D1r7xdMdA' );

var app = angular.module("myApp")
    .service("dataService", ['$http', '$q', function ($http, $q, ENV) {

        var service = {};

        //service.getData = function () {
        //    var deferred = $q.defer();
        //
        //
        //    $http.get('api/endpoint', {cache: true}).
        //        then(function (response) {
        //
        //            deferred.resolve(response);
        //
        //        }, function (response) {
        //            deferred.reject(response);
        //        });
        //
        //    return deferred.promise;
        //
        //};

        return service;
    }]);


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


var app = angular.module("myApp")
    .service("stateService", function ($stateParams, $state, $http, $q) {

        var stateService = {};

        // validate param is in URL
        stateService.isParam = function (paramName) {
            var bool = $stateParams[paramName];
            if (bool) {
                return true;
            }
            return false;
        };

        // validate param is NOT in URL
        stateService.isNotParam = function (paramName) {
            var bool = $stateParams[paramName];
            if (bool) {
                return false;
            }
            return true;
        };

        // toggle a panel parameter (open/closed)
        stateService.toggleParam = function (paramName) {
            var bool = $stateParams[paramName];
            if (!bool) {
                // mutex logic that makes only 1 panel open at a time
                for (var param in $stateParams) {
                    if ($stateParams[param] === 'open') {
                        $stateParams[param] = null;
                    }
                }
                $stateParams[paramName] = 'open';
            } else {
                delete $stateParams[paramName];
            }
            var state = $state.current.name || 'home';
            stateService.setState(state, $stateParams, false);
        };

        // open a panel parameter
        stateService.openParam = function (paramName) {
            var bool = $stateParams[paramName];
            if (!bool) {
                // mutex logic that makes only 1 panel open at a time
                for (var param in $stateParams) {
                    if ($stateParams[param] === 'open') {
                        $stateParams[param] = null;
                    }
                }
                $stateParams[paramName] = 'open';
                var state = $state.current.name || 'home';
                stateService.setState(state, $stateParams, false);
            }
        };

        // close a panel parameter
        stateService.closeParam = function (paramName) {
            var bool = $stateParams[paramName];
            if (bool) {
                delete $stateParams[paramName];
                var state = $state.current.name || 'home';
                stateService.setState(state, $stateParams, false);
            }
        };

        // set a parameter with a passed value
        stateService.setParamWithVal = function (paramName, val) {
            $stateParams[paramName] = val;
            var state = $state.current.name || 'home';
            stateService.setState(state, $stateParams, false);
        };

        // set state
        stateService.setState = function (state, params, reload) {
            if (reload) {
                $state.go(state, params);
            }
            else {
                $state.go(state, params, {
                    // prevent the events onStart and onSuccess from firing
                    notify: false,
                    // prevent reload of the current state
                    reload: false,
                    // replace the last record when changing the params so you don't hit the back button and get old params
                    location: 'replace',
                    // inherit the current params on the url
                    inherit: true
                });
            }
        }

        return stateService;
    });
var app = angular.module("myApp").service("userService", function ($http, $q, $location, $rootScope) {

    var userService = {};

    // get user
    userService.getUser = function () {
        var deferred = $q.defer();

        // call the api to authenticate user
        $http.get('/api/user')
            .success(function (data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, c) {
                // return the message
                deferred.reject(data);
            });

        return deferred.promise;
    };

    userService.getUser = function () {
        var deferred = $q.defer();

        // call the api to authenticate user
        $http.get('/api/user')
            .success(function (data, status, headers, config) {
                if (typeof data.user === "undefined") {
                    $rootScope.user = null;
                }
                else {
                    $rootScope.user = data;
                }
                deferred.resolve(data);
            })
            .error(function (data, status, headers, c) {
                // return the message
                deferred.reject(data);
                if (status === 302) {
                    $location.path('/login');
                }
            });

        return deferred.promise;
    };

    return userService;
});
angular.module('myApp').controller('LoginCtrl', function ($scope, stateService, userService, $timeout, $mdSidenav, $log, $mdUtil, $mdMedia) {
    $scope.title = "kickstart";

    $scope.stateService = stateService;

    $scope.submit = function(strategy){
        $("#login-" + strategy).submit();
    }

})
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
