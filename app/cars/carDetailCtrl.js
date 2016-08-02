
(function () {
    "use strict";
    
    angular
        .module("carRepositoryManagement")
        .controller("CarDetailCtrl",
                    ["car",
                     "carService",
                        CarDetailCtrl]);
    
    function CarDetailCtrl(car, carService) {
        var vm = this;

        vm.car = car;
        vm.title = "Car Detail: " + vm.car.carName;

        vm.marginPercent = carService.calculateMarginPercent(vm.car.price, vm.car.cost);

        if(vm.car.tags){
            //convert an array to a string
            vm.car.tagList = vm.car.tags.toString();
        }
    }
}());