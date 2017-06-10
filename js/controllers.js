app.controller("appController", function appController($scope,$http){
	    $scope.error = false;
	    $scope.loading = true;
	    $http.get('services/data.php', { params: { action : 'get' }})
            .success(function(data) {
		    $scope.users = eval(data);
		    $scope.loading = false;
        })
        .error(function(data) {
		    console.log('Error: ' + data);
		    $scope.loading = false;
		    $scope.error = true;
        }); 
});

app.controller("infoController", function infoController($scope,$routeParams){
	$scope.user = $scope.users[$routeParams.id];
});

app.controller("addController", function addController($scope,$location,$http){
	$scope.textButton = "Add user";
	$scope.user = {};
	$scope.newUser = function(){
		$http({
		  url: 'services/data.php',
		  method: "POST",
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' },
		  data: { action : 'add', name: $scope.user.name, web: $scope.user.web, age: $scope.user.age, profesion: $scope.user.profesion }
		})
		.then(function(response) {
		    $scope.user.id=response;
		    $scope.users.push($scope.user);
		}, function(response) {
			$scope.error = true;
		});
		$location.url("/index");
	}
});

app.controller("editController", function editController($scope,$routeParams,$http,$location){
	$scope.textButton = "Edit user";
	$scope.user = $scope.users[$routeParams.id];
	$scope.editUser = function(){
		$http({
		  url: 'services/data.php',
		  method: "POST",
          headers : { 'Content-Type': 'application/x-www-form-urlencoded' },
		  data: { action : 'edit', id: $scope.user.id, name: $scope.user.name, web: $scope.user.web, age: $scope.user.age, profesion: $scope.user.profesion }
		})
		.then(function(response) {
            $scope.users[$routeParams.id] = $scope.user;
		}, function(response) {
			$scope.error = true;
		});
        $location.url("/index");
	}
});

app.controller("removeController", function removeController($scope,$routeParams,$http,$location){
	$scope.user = $scope.users[$routeParams.id];
	$scope.removeUser = function(){
		$http({
		  url: 'services/data.php',
		  method: "POST",
          headers : { 'Content-Type': 'application/x-www-form-urlencoded' },
		  data: { action : 'delete', id: $scope.user.id }
		})
		.then(function(response) {
            $scope.users.splice($scope.users.indexOf($scope.user), 1);
		})
		$location.url("/index");
	}
});

app.controller("loginCtrl",function($scope,$location,$rootScope,$http){
	$scope.submit = function(){
		var uname = $scope.username;
		var pass = $scope.password;
		$http({
		  url: 'services/data.php',
		  method: "POST",
          headers : { 'Content-Type': 'application/x-www-form-urlencoded' },
		  data: { action : 'login', username: uname, password: pass }
		})
		.then(function(response) {
			console.log(typeof response.data);
			console.log(response.data);
			if(response.data != 'null'){
				$rootScope.logIn = true;
				$location.path('/index');
			}else{
				//alert('Invalid username and password');
				$("#loginerror").show();
			}
		}, function(response) {
			$scope.error = true;
		});
	}
});
