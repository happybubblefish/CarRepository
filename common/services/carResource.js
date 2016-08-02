
(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("carResource",
            ["$resource", carResource])
        .factory("userResource",
            ["$resource", userResource]);

    function carResource($resource) {
        //:carId is optional
        return $resource("/api/cars/:carId");
    }

    function userResource($resource) {
        return $resource("/api/users/:userId", {userId:'@id'});
    }
}());