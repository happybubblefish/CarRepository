
(function () {
    "use strict";
    
    angular
        .module("carRepositoryManagement")
        .controller("UtilitiesCtrl",
                    ["utilitiesService",
                     UtilitiesCtrl]);
    
    function UtilitiesCtrl(utilitiesService) {
        var vm = this;

        vm.calculateInterest = function () {
            vm.monthlyPayment = utilitiesService.calculateInterest(vm.principal, vm.interestRate, vm.monthAmounts);
            vm.totalInterests = vm.monthlyPayment * vm.monthAmounts;
        }
    }
}());