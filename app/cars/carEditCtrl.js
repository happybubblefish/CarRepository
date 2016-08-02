
(function () {
    "use strict";

    angular
        .module("carRepositoryManagement")
        .controller("CarEditCtrl",
            ["car",
             "$state",
             "carService",
            CarEditCtrl]);

    function  CarEditCtrl(car, $state, carService) {
        var vm = this;

        vm.car = car;
        vm.priceOption = "percent";

        //By making a function, it will recalculate whenever the price or cost is changed.
        vm.marginPercent = function () {
          return carService.calculateMarginPercent(vm.car.price, vm.car.cost);
        };

        vm.calculatePrice = function () {
            var price = 0;

            if(vm.priceOption == "amount"){
                price = carService.calculatePriceFromMarkupAmount(vm.car.cost, vm.markupAmount);
            }

            if(vm.priceOption == "percent"){
                price = carService.calculatePriceFromMarkupPercent(vm.car.cost, vm.markupPercent);
            }

            vm.car.price = price;
        };

        if(vm.car && vm.car.carId){
            vm.title = "Edit: " + vm.car.carName;
        }else{
            vm.title = "New Car";
        }

        //for datepicker
        vm.open = function ($event) {
            // prevent any default action from being triggered
            $event.preventDefault();
            // prevent action from being propagated
            $event.stopPropagation();

            vm.opened = !vm.opened;
        }

        vm.submit = function (isValid) {
            if(isValid){
                vm.car.$save(function (data) {
                    toastr.success("Save Successful");
                });
            }else{
                alert("Please correct the validation errors first.");
            }
        }

        vm.cancel = function () {
            $state.go("carList");
        }

        vm.addTags = function (tags) {
            if(tags){
                var array = tags.split(',');
                vm.car.tags = vm.car.tags ? vm.car.tags.concat(array) : array;
                vm.newTags = "";
            }else{
                alert("Please enter one or more tags separated by commas.");
            }
        }

        vm.removeTag = function (idx) {
            vm.car.tags.splice(idx, 1);
        }
    }
}());
