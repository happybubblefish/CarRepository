
(function () {
    "use strict";
    
    angular
        .module("common.services")
        .factory("sessionService",
                ["$rootScope",
                    "$cookies",
                    SessionService]);
    
    function SessionService($rootScope, $cookies) {
        $cookies.session = {};
        $cookies.session.login = function (data) {
            var strData = JSON.stringify(data);
            $cookies.put("account", strData);
            localStorage.setItem("session", data);
    };

        $cookies.session.logout = function () {
            localStorage.removeItem("session");
            localStorage.setItem("isLoggedIn", false);
        };

        $rootScope.logout = function(){
            $cookies.session.logout();

            $rootScope.userLoggedIn = false;
        }

        $cookies.session.isLoggedIn = function () {
            return localStorage.getItem("session") !== null;
        };

        return {
            session: $cookies.session
        };
    }
}());