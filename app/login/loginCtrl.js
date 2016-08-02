
(function () {
    "use strict";

    angular
        .module("carRepositoryManagement")
        .controller("LoginCtrl",
            ["$state",
                "users",
                "sessionService",
                LoginCtrl]);

    function LoginCtrl($state, users, sessionService) {
        var vm = this;

        vm.users = users;

        localStorage.login = vm.submit;

        vm.submit = function (isValid) {
            if (isValid) {
                for (var i = 0; i < vm.users.length; i++) {
                    if (vm.users[i].email == vm.username && vm.users[i].password == vm.password) {

                        var account = {};
                        account.username = vm.username;
                        account.password = vm.password;
                        sessionService.session.login(account);

                        $state.go("home");
                        localStorage.setItem("isLoggedIn", true);
                    }
                }

            } else {
            }
        }
    }
}());