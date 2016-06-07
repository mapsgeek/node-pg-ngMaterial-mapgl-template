var app = angular.module("myApp").service("userService", ['$http', '$q', function ($http, $q, ENV,$location) {

        var userService = {};

        // user log in function
        userService.logIn = function (strategy) {
            var deferred = $q.defer();

            // call the api to authenticate user
            $http.get('/api/auth/github')
                .success(function (data, status, headers, config) {
                    if (typeof data.user === "undefined") {
                        $rootScope.currentUser = null;
                    }
                    else {
                        $rootScope.currentUser = data;
                    }
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
                    $rootScope.currentUser = null;
                }
                else {
                    $rootScope.currentUser = data;
                }
                deferred.resolve(data);
            })
            .error(function (data, status, headers, c) {
                // return the message
                deferred.reject(data);
                if(status === 302){
                    $location.path('/login');
                }
            });

        return deferred.promise;
    };

        return userService;
    }]);