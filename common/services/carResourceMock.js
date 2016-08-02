
(function () {
    "use strict";

    var app = angular
        .module("carResourceMock",
                ["ngMockE2E"]);

    //app.run to perform initialization, it gets executed when the module if loaded.
    app.run(function ($httpBackend) {
        var cars = [
            {
                "carId": 1,
                "carName": "Honda CRV 2016",
                "carCode": "HON-0005",
                "releaseDate": Date.parse("March 19, 2015"),
                "description": "Honda CRV EX SUV",
                "cost": 23957.00,
                "price": 26899.00,
                "starRating": 4.8,
                "tags": ["honda", "suv"],
                "imageUrl": "images/CRV.jpg"
            },
            {
                "carId": 2,
                "carName": "Toyota RAV4 2016",
                "carCode": "TOY-0020",
                "releaseDate": Date.parse("April 18, 2015"),
                "description": "Toyota RAV4",
                "cost": 22988.00,
                "price": 27200.00,
                "starRating": 4.2,
                "tags": ["toyota", "suv"],
                "imageUrl": "images/RAV4.jpg"
            },
            {
                "carId": 3,
                "carName": "Mazada CX-5 2016",
                "carCode": "MAZ-0012",
                "releaseDate": Date.parse("May 20, 2015"),
                "description": "Mazada CX-5",
                "cost": 27839.00,
                "price": 28899.00,
                "starRating": 4.7,
                "tags": ["mazada", "suv"],
                "imageUrl": "images/CX-5.png"
            },
            {
                "carId": 4,
                "carName": "Subaru Forester 2016",
                "carCode": "SUB-0010",
                "releaseDate": Date.parse("May 05, 2015"),
                "description": "Subaru Forester",
                "cost": 23469.00,
                "price": 25689.00,
                "starRating": 4.7,
                "tags": ["subaru", "suv"],
                "imageUrl": "images/SubaruForester.jpg"
            },
            {
                "carId": 5,
                "carName": "Hundai Santa Fe 2016",
                "carCode": "HUN-0022",
                "releaseDate": Date.parse("September 02, 2015"),
                "description": "Hundai Santa Fe",
                "cost": 22895.00,
                "price": 25988.00,
                "starRating": 4.6,
                "tags": ["hundai", "suv"],
                "imageUrl": "images/SantaFe.jpg"
            }
        ];

        var carUrl = "/api/cars";

        $httpBackend.whenGET(carUrl).respond(cars);
        var editingRegex = new RegExp(carUrl + "/[0-9][0-9]*", '');
        $httpBackend.whenGET(editingRegex).respond(function (method, url, data) {
            var car = {"carId": 0};
            var parameters = url.split("/");
            var length = parameters.length;
            var id = parameters[length - 1];

            if(id > 0){
                for(var i = 0; i < cars.length; i++){
                    if(cars[i].carId == id){
                        car = cars[i];
                        break;
                    }
                }
            }

            return [200, car, {}];
        });

        $httpBackend.whenPOST(carUrl).respond(function (method, url, data) {
            var car = angular.fromJson(data);

            if(!car.carId){
                //new car Id
                car.carId = cars[cars.length - 1].carId + 1;
                cars.push(car);
            }else{
                //update car
                for(var i = 0; i < cars.length; i++){
                    if(cars[i].carId == car.carId){
                        cars[i] = car;
                        break;
                    }
                }
            }

            return [200, car, {}];
        });

        var users = [
            {
                "userId": 1,
                "firstName": "Lin",
                "lastName": "Cong",
                "gender": "male",
                "DOB": Date.parse("May 20, 1980"),
                "email": "lincong@123.com",
                "password": "123",
                "roles": ["admin", "user"]
                // "loggedIn": false,
                // "isDeleted": false
            },
            {
                "userId": 2,
                "firstName": "Jassica",
                "lastName": "Lyon",
                "gender": "female",
                "DOB": Date.parse("June 02, 1990"),
                "email": "jassica@123.com",
                "password": "123",
                "roles": ["user"]
                // "loggedIn": false,
                // "isDeleted": false
            },
            {
                "userId": 3,
                "firstName": "Tony",
                "lastName": "Stone",
                "gender": "male",
                "DOB": Date.parse("October 29, 1985"),
                "email": "tony@123.com",
                "password": "123",
                "roles": ["user"]
                // "loggedIn": false,
                // "isDeleted": false
            }
        ];

        var userUrl = "/api/users";

        $httpBackend.whenGET(userUrl).respond(users);
        var editingRegex2 = new RegExp(userUrl + "/[0-9][0-9]*", '');
        $httpBackend.whenGET(editingRegex2).respond(function (method, url, data) {
            var user = {"userId": 0};
            var parameters = url.split("/");
            var length = parameters.length;
            var id = parameters[length - 1];

            if(id > 0){
                for(var i = 0; i < users.length; i++){
                    if(users[i].userId == id){
                        user = users[i];
                        break;
                    }
                }
            }

            return [200, user, {}];
        });


        $httpBackend.whenPOST(userUrl).respond(function (method, url, data) {
            var user = angular.fromJson(data);

            if(!user.userId){
                //new car Id
                user.userId = users[users.length - 1].userId + 1;
                users.push(user);
            }else{
                //update user
                for(var i = 0; i < users.length; i++){
                    if(users[i].carId == user.userId){
                        users[i] = user;
                        break;
                    }
                }
            }

            return [200, user, {}];
        });

        //pass through any requests for application files
        $httpBackend.whenGET(/app/).passThrough();
    });
}());