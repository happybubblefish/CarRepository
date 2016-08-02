
(function () {
    "use strict";

    angular
        .module("carRepositoryManagement")
        .controller("UserEditCtrl",
                    ["user",
                     UserEditCtrl]);
    
    function UserEditCtrl(user) {
        var vm = this;

        vm.user = user;

        vm.submit = function (isValid) {
            if(vm.roles.admin){
                vm.user.roles.push("admin");
            }

            if(vm.roles.user){
                vm.user.roles.push("user");
            }

            vm.user.gender = vm.gender.name;

            if (isValid) {
                vm.user.$save(function (data) {
                    toastr.success("Save Successful");
                });
            } else {
                alert("Please correct the validation errors first.");
            }
        }

        //for datepicker
        vm.open = function ($event) {
            // prevent any default action from being triggered
            $event.preventDefault();
            // prevent action from being propagated
            $event.stopPropagation();

            vm.opened = !vm.opened;
        }

        vm.cancel = function () {
            $state.go("home");
        }
    }
}());