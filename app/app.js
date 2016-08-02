(function () {
    "use strict";
    var app = angular.module("carRepositoryManagement",
        ["common.services",
            "ui.router",
            "ui.mask",
            "ui.bootstrap",
            "angularCharts",
            "ngCookies",
            "carResourceMock"]);

    app.config(["$stateProvider",
        "$urlRouterProvider",
        function ($stateProvider, $urlRouterProvider) {
            //if the activated state has no entry in this function, or if there is no active state, then display the state
            // associated with the "/users" url.
            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state("home", {
                    url: "/",
                    templateUrl: "app/welcomeView.html"
                })

                .state("login", {
                    url: "/login",
                    templateUrl: "app/login/login.html",
                    controller: "LoginCtrl as vm",
                    resolve: {
                        userResource: "userResource",

                        users: function (userResource) {
                            return userResource.query().$promise;
                        }
                    }
                })
                .state("userList", {
                    url: "/users",
                    templateUrl: "app/users/userListView.html",
                    controller: "UserListCtrl as vm"
                })
                .state("registration", {
                    url: "/registration/:userId",
                    templateUrl: "app/registration/registration.html",
                    controller: "RegistrationCtrl as vm",
                    resolve: {
                        userResource: "userResource",

                        user: function (userResource, $stateParams) {
                            var userId = $stateParams.userId;

                            return userResource.get(
                                {userId: userId}
                            ).$promise;
                        }
                    }
                })
                .state("userEidt", {
                    url: "/userEidt/:userId",
                    templateUrl: "app/users/userEditView.html",
                    controller: "UserEditCtrl as vm",

                    resolve: {
                        userResource: "userResource",

                        user: function (userResource, $stateParams) {
                            var userId = $stateParams.userId;

                            return userResource.get(
                                {userId: userId}
                            ).$promise;
                        }
                    }
                })
                // cars
                .state("carList", {
                    url: "/cars",
                    templateUrl: "app/cars/carListView.html",
                    controller: "CarListCtrl as vm"

                })
                .state("carEdit", {
                    // abstract: true,
                    url: "/cars/edit/:carId",
                    templateUrl: "app/cars/carEditView.html",
                    controller: "CarEditCtrl as vm",
                    resolve: {
                        carResource: "carResource",

                        car: function (carResource, $stateParams) {
                            var carId = $stateParams.carId;
                            return carResource.get(
                                {carId: carId}
                            ).$promise;
                        }
                    }
                })
                .state("carEdit.info", {
                    url: "/info",
                    templateUrl: "app/cars/carEditInfoView.html"
                })
                .state("carEdit.price", {
                    url: "/price",
                    templateUrl: "app/cars/carEditPriceView.html"
                })
                .state("carEdit.tags", {
                    url: "/tags",
                    templateUrl: "app/cars/carEditTagsView.html"
                })


                .state("carDetail", {
                    url: "/cars/:carId",
                    templateUrl: "app/cars/carDetailView.html",
                    controller: "CarDetailCtrl as vm",
                    resolve: {
                        carResource: "carResource",

                        car: function (carResource, $stateParams) {
                            var carId = $stateParams.carId;
                            return carResource.get(
                                {carId: carId}
                            ).$promise;
                        }
                    }
                })

                .state("priceAnalytics", {
                    url: "/priceAnalytics",
                    templateUrl: "app/prices/priceAnalyticsView.html",
                    controller: "PriceAnalyticsCtrl",

                    //Ensure all the required data are loaded before navigated to the page.
                    resolve: {
                        carResource: "carResource",

                        cars: function (carResource) {
                            return carResource.query().$promise;
                        }
                    }
                })
                .state("utilities", {
                    url: "/utilities",
                    templateUrl: "app/utilities/utilitiesView.html",
                    controller: "UtilitiesCtrl as vm"
                })
                .state("utilities.interestCaculator", {
                    url: "/interestCalculator",
                    templateUrl: "app/utilities/interestCalculatorView.html"
                })
        }]
    );

    app.controller("MainCtrl", ["$scope", "$state", MainCtrl]);

    function MainCtrl($scope, $state) {

        if(localStorage.getItem("isLoggedIn") == null){
            $scope.isLoggedIn = false;
        }else{
            $scope.isLoggedIn = localStorage.getItem("isLoggedIn");
        }


        $scope.login = function () {
            $state.go("login");
            localStorage.setItem("isLoggedIn", true);
            $scope.isLoggedIn = true;
        }

        $scope.logout = function () {
            localStorage.setItem("isLoggedIn", false);
            $scope.isLoggedIn = false;
        }
    };
}());
