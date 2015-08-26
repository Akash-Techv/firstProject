(function(){
	var formCtrl = function($scope,$http,countryState,$filter){
		console.log("formCtrl");
		$scope.passwordNotMatched = false;
		$scope.countryArray = countryState.countryArray
		$scope.stateArray = countryState.stateArray;
            
            var new_Array = [];
            for(var i=0;i<$scope.stateArray.length;i++){
                new_Array.push($scope.stateArray[i].split("|"));
            }

            //getting states on change country
            $scope.stArray = [];
            $scope.getState = function(val){
                $scope.stArray = [];
                $scope.stArray = new_Array[val];
            }
        $http.post('http://192.168.0.129:3808/classList',{})
        .success(function(data){
        	if(data.status == '200'){
        		$scope.classList = data.class
        		localStore.setItem("classList",JSON.stringify(data.class));
        	}else{
        		$scope.classList = '';
        		localStore.setItem("classList",'');
        	}
        });


		// when clicked on cancel 
		$scope.cancel = function(){
			window.location.hash = '/';
			window.location.reload();
		}
		$scope.validatePasswords = function(password,confirmPassword){
			if(password != confirmPassword){
				$scope.passwordNotMatched = true;
				$scope.student.password = '';
				$scope.student.confirmPassword = '';
			}
		}

		$scope.saveForm = function(student){
			console.log("student",student);
			//student.country = $scope.countryArray[student.country];
	        
			var params = student;

			var responseData = $http.post('http://192.168.0.129:3808/studentReg',params);
			responseData.success(function(data){
				if(data.status == '200'){
				alert("admission form has been submitted");
				window.location.hash = '/student_signIn';
				}else{
					alert("problem while submitting")
				}
			})
			responseData.error(function(data){
				alert("no connection");
			})
		}

		if(window.location.hash == '#/addForm'){

		}

	}
	var app = angular.module("schoolWebsite");
	app.controller('formCtrl',["$scope","$http","countryState","$filter",formCtrl]);
}());