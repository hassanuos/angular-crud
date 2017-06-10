var app = angular.module("app",[]);

app.config(function($routeProvider){
	$routeProvider.when("/", {
		templateUrl : "templates/loginview.html"
	})
	.when("/index", {
		resolve :{ "check" : function ($location,$rootScope){
				if(!$rootScope.logIn){
					$location.path("/");
				}
			}
		},
		templateUrl : "templates/index.html"
	})
	.when('/info/:id', {
		title: 'Info User',
		templateUrl : "templates/info.html",
		controller : "infoController"
        })
	.when("/add", {
		title: 'Add User',
		templateUrl : "templates/add.html",
		controller : "addController"
	})
	.when("/edit/:id", {
		title: 'Edit User',
		templateUrl : "templates/edit.html",
		controller : "editController"
	})
 	.when("/remove/:id", {
 		title: 'Delete User',
 		templateUrl : "templates/remove.html",
 		controller : "removeController"
 	})
 	.otherwise({ redirectTo : "/"})
});
