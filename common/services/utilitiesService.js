/**
 * Created by Lin on 7/21/2016.
 */
(function () {
    "use strict";
    
    angular
        .module("common.services")
        .factory("utilitiesService",
                [UtilitiesService]);
    
    function UtilitiesService() {
        function calculateInterest(principal, interestRate, monthsAmounts) {
            var interest;

            interest = (interestRate / 12 * principal) / (1 - Math.pow((1 + interestRate / 12), (-monthsAmounts)));

            return interest;
        }

        return{
            calculateInterest: calculateInterest
        }
    }
}());