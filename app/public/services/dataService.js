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

