(function(){
	var app = angular.module('schoolWebsite');
	var studentLoginController = function($scope,$http){
		console.log("studentLoginController");
		localStore.setItem("login",'false');

		

		//$scope.admissionForm = false;
		//console.log("admissionForm",$scope.admissionForm);
		//console.log("studentLoginController");
			$scope.loginForm = function(loginData){
				console.log("loginForm")
				var params = loginData;
				params['type'] = "student";
				var responseData = $http.post('http://192.168.0.129:3808/login',params);
				responseData.success(function(data){
					if(data.status == '200'){
						localStore.setItem("login",'true');
						localStore.setItem("studentData",JSON.stringify(data.studentDetails));
						window.location.hash = '/admissionForm';
					}else{
						alert("invalid credentials");
						$scope.loginData.email = '';
						$scope.loginData.password = '';
					}
			})
			responseData.error(function() {//data, status, headers, config
                    // cb({"statusCode":"400","statusMessage":"Connection could not be established. Please try again."});
                    console.log("Connection could not be established");
                });
			//localStore.setItem("formId","2");
			//if response data has failed then

		}
		

	}
	app.controller('studentLoginController',["$scope","$http",studentLoginController]);

}());