
(function () {
    "use strict";

    angular
        .module("carRepositoryManagement")
        .controller("PriceAnalyticsCtrl",
                     ["$scope",
                      "$filter",
                      "cars",
                      "carService",
                      PriceAnalyticsCtrl]);

    function PriceAnalyticsCtrl($scope, $filter, cars, carService) {
        $scope.title = "Price Analytics";

        for(var i = 0; i < cars.length; i++){
            cars[i].marginPercent = carService.calculateMarginPercent(cars[i].price, cars[i].cost);

            cars[i].marginAmount = carService.calculateMarginAmount(cars[i].price, cars[i].cost);
        }

        var orderedCarsAmount = $filter("orderBy")(cars, "marginAmount");
        var filteredCarsAmount = $filter("limitTo")(orderedCarsAmount, 5);

        var chartDataAmount = [];
        for(var i = 0; i < filteredCarsAmount.length; i++){
            chartDataAmount.push({
                x: filteredCarsAmount[i].carName,

                //data series
                y: [filteredCarsAmount[i].cost,
                    filteredCarsAmount[i].price,
                    filteredCarsAmount[i].marginAmount]
            });
        }

        $scope.dataAmount = {
            series: ["Cost", "Price", "Margin Amount"],
            data: chartDataAmount
        };

        $scope.configAmount = {
            "title": "Top $ Margin Cars",
            "tooltips": true,
            "labels": false,
            "mouseover": function () { },
            "mouseout": function () { },
            "click": function () { },
            "legend": {
                "display": true,
                "position": "right"
            }
        };

        var orderedCarsPercent = $filter("orderBy")(cars, "marginPercent");
        var filteredCarsPercent = $filter("limitTo")(orderedCarsPercent, 5);

        var chartDataPercent = [];
        for(var i = 0; i < filteredCarsPercent.length; i++){
            chartDataPercent.push({
                x: filteredCarsPercent[i].carName,
                y: [filteredCarsPercent[i].marginPercent]
            });
        }

        $scope.dataPercent = {
            series: ["Margin %"],
            data: chartDataPercent
        };

        $scope.configPercent = {
            "title": "Top % Margin Cars",
            "tooltips": true,
            "labels": false,
            "mouseover": function () { },
            "mouseout": function () { },
            "click": function () { },
            "legend": {
                "display": true,
                "position": "right"
            }
        };
    }
}());