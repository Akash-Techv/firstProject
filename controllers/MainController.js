(function(){
	var app = angular.module('schoolWebsite');
	var MainController = function($scope,$http){
		console.log("MainController");
		console.log("Test comment");
		$scope.home = 'false';
		$scope.adminZone = 'false';
		$scope.studentZone = 'false';
		$scope.contact = 'false';
		if(window.location.hash == '#/'){
			$scope.home = 'true';
			$scope.adminZone = 'false';
			$scope.contact = 'false';
			$scope.studentZone = 'false';
		}
		if(window.location.hash == '#/addForm' || window.location.hash == '#/student_signIn'){
			$scope.studentZone = 'true';
			$scope.contact = 'false';
			$scope.home = 'false';
			$scope.adminZone = 'false';
		}
		if(window.location.hash == '#/admin_signIn'){
			$scope.adminZone = 'true';
			$scope.contact = 'false';
			$scope.studentZone = 'false';
			$scope.home = 'false';
		}
		if(window.location.hash == '#/contactUs'){
			$scope.contact = 'true';
			$scope.home = 'false';
			$scope.adminZone = 'false';
			$scope.studentZone = 'false';
		}
		$scope.homeTab = function(){
			$scope.home = 'true';
			$scope.adminZone = 'false';
			$scope.contact = 'false';
			$scope.studentZone = 'false';
		}
		$scope.studentZoneTab = function(){
			$scope.studentZone = 'true';
			$scope.contact = 'false';
			$scope.home = 'false';
			$scope.adminZone = 'false';
		}
		$scope.adminZoneTab = function(){
		   	$scope.adminZone = 'true';
			$scope.contact = 'false';
			$scope.studentZone = 'false';
			$scope.home = 'false';
		}
		$scope.contactUsTab = function(){
		   $scope.contact = 'true';
		   $scope.home = 'false';
		   $scope.adminZone = 'false';
		   $scope.studentZone = 'false';
		}
		//$scope.checkLogin = checkLogin;

		 // function checkLogin(){
   //          if(!rhyton_store.getItem('isLoggedin') || rhyton_store.getItem('isLoggedin')=== 'false'){
   //              if(window.location.hash!= '#/signup')
   //              window.location.hash = '/';

   //          }else{
   //              return true;
   //          }
   //      }
		$scope.login = false;
	
	}
	app.controller("MainController",["$scope","$http",MainController]);
}());