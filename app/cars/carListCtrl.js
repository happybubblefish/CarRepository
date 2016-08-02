(function () {
    "use strict";

    angular.module("carRepositoryManagement")
        .controller("CarListCtrl",
                    ["carResource", CarListCtrl]);

    function CarListCtrl(carResource) {
        var vm = this;

        carResource.query(function (data) {
           vm.cars = data;
        });

        vm.showImage = false;
        vm.toggleImage = function () {
            vm.showImage = !vm.showImage;
        }
    }
}());