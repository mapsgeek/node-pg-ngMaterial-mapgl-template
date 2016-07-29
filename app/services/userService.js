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