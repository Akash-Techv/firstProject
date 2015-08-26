(function(){
	var adminLoginController = function($scope,$http){
		$scope.adminLogin = function(loginData){
			var params = loginData;
			console.log("params",params)
			 var responseData = $http.post('http://192.168.0.129:3808/login',params);
			 responseData.success(function(data){
			 	console.log("data",data);
			 	if(data.status == '200'){
			 		console.log("data",data);
			 		localStore.setItem("adminId",data.adminId);
					window.location.hash = '/administration';
				}else{
					alert("Invalid credentials")
			 	}
			});
			responseData.error(function(data){
				console.log("no connection")
			});

		}
	}
	var app = angular.module('schoolWebsite');
	app.controller('adminLoginController',["$scope","$http",adminLoginController]); 
}());