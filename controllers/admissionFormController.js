(function(){
	var app = angular.module('schoolWebsite');
	var admissionFormController = function($scope,$http,$filter,countryState){
            console.log("admissionFormController");
            $scope.editmode = 'false';
            $scope.classList = JSON.parse(localStore.getItem('classList'));
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
            if(localStore.getItem('studentData') && localStore.getItem('login') == 'false'){
                  window.location.hash = '/student_signIn';
            }
        if(localStore.getItem('studentData')!= undefined || localStore.getItem('studentData')!= null && window.location.hash == '#/admissionForm'){
                  var student = JSON.parse(localStore.getItem('studentData'));
                  var temp = JSON.parse(localStore.getItem("classList"));
                  for(var i=1; i< temp.length ;i++){
                        if(temp[i].id == student.class_id){
                              student.class_id = temp[i].classNumber;
                        }
                  }
                  student.country = $scope.countryArray[student.country];
                  student.dateOfBirth = $filter('date')(student.dateOfBirth, 'MM-dd-yyyy');
                  $scope.student = student;
            }
       	$scope.logout = function(){
       		localStore.clear();
       		window.location.hash = '/';
       	}
            $scope.editMode = function(){
                  $scope.editmode = 'true';
                  var temp = JSON.parse(localStore.getItem("classList"));
                  for(var i=1; i< temp.length ;i++){
                        if(temp[i].classNumber == $scope.student.class_id){
                              $scope.student.class_id = temp[i].id;
                        }
                  }
                  $scope.student.country = $scope.countryArray.indexOf($scope.student.country).toString();
                  $scope.getState($scope.student.country);
            }

            $scope.saveStudentForm = function(student){
                  var responseData = $http.post('http://192.168.0.129:3808/updateStudentReg',student);
                  responseData.success(function(data){
                        if(data.status == '200'){
                              alert("student updated successfully");
                              window.location.reload();
                        }else{
                              alert("failed to update")
                        }

                  });
            }
		
	}
	app.controller('admissionFormController',['$scope','$http','$filter',"countryState",admissionFormController]);
}());