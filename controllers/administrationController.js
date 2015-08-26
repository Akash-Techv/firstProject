(function(){
	var administrationController = function($scope,$http,$filter,countryState){
		console.log("administrationController");
			$scope.viewDetails = 'false';
			$scope.editDetails = 'false';
			$scope.noRecordsStudent = 'false';
			$scope.noRecordsTeacher = 'false';
			$scope.addTeacher = 'false';
			$scope.viewTeacher = 'false';
			$scope.editTeacher = 'false';
			$scope.adjustClasses = 'false';
			$scope.editClass = 'false';
			$scope.addclass = 'false';
			localStore.setItem("form","false");
			$scope.countryArray = countryState.countryArray
			$scope.stateArray = countryState.stateArray;
            var temporary;
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

			var params = {};
			params['id'] = localStore.getItem("adminId");
			params['type'] = "admin";
			 var responseData = $http.post('http://192.168.0.129:3808/stuteachList',params);
			 responseData.success(function(data){
			 	if(data.status == '200'){
			 		$scope.students = data.studentDetails;
			 		if(data.studentDetails.length <= 0){
			 			$scope.noRecordsStudent = 'true';
			 			$scope.notification = "currently there are no records"
			 		} 

			 		 var classList = JSON.parse(localStore.getItem("classList"));
			 		 angular.forEach(data.teacherDetails, function(key,val){
			 		 	var clses = key.class.toString().split(",");
			 		 	var classNames=[];
			 		 	angular.forEach(clses, function(i,j){
			 		 		angular.forEach(classList,function(k,l){
			 		 			if(k.id == i){
			 		 				classNames.push(k.classNumber);
			 		 			}
			 		 		})
			 		 	})
			 		 	data.teacherDetails[val].class= classNames.toString(); 
			 		 });
			 		  	$scope.teachers = data.teacherDetails;
			 		if(data.teacherDetails.length <= 0){
			 			$scope.noRecordsTeacher = 'true';
			 			$scope.notification = "currently there are no records"
			 		}
			 	}else{
			 		console.log("Fail",data);
			 	}
			 });
			 responseData.error(function(){
			 	alert("No connection found");
			 })

		$scope.getInfo = function(student){
			$scope.viewDetails = 'true';
			var temp = JSON.parse(localStore.getItem("classList"));
                  for(var i=1; i< temp.length ;i++){
                        if(temp[i].id == student.class_id){
                              student.class_id = temp[i].classNumber;
                        }
                  }
			//$scope.studentsDetails = 'false';
			student.dateOfBirth = $filter('date')(student.dateOfBirth, 'dd-MM-yyyy');
			$scope.student = student;
		}

		$scope.editInfo = function(student){
			$scope.editDetails = 'true';
			var country_id = parseInt(student.country);
			console.log("country_id",country_id)
			// var temp = JSON.parse(localStore.getItem("classList"));
   //                for(var i=1; i< temp.length ;i++){
   //                      if(temp[i].id == student.class_id){
   //                            student.class_id = temp[i].classNumber;
   //                      }
   //                }
			//student.country = $scope.countryArray[country_id];
			$scope.getState(student.country);
			student.dateOfBirth = $filter('date')(student.dateOfBirth, 'dd-MM-yyyy');
			$scope.student = student;
			//console.log($scope.student)

		}
		$scope.deleteInfo = function(student){
			var params = {};
			params['studentId'] = student.id;
			params['id'] = parseInt(localStore.getItem('adminId'));
			params['type'] = "admin"

			if (confirm("confirm your deletion !") == true) {
				var responseData = $http.post('http://192.168.0.129:3808/deleteStudent',params);
				responseData.success(function(data){
					if(data.status == '200'){
						alert("deletion successfull");
						window.location.reload();
					}else{
						alert("problem while deleting");
					}
				})
    		}
		}
		$http.post('http://192.168.0.129:3808/classList',{})
        		.success(function(data){
        			if(data.status == '200'){
        				temporary = data.class
        				$scope.classList = data.class
        				localStore.setItem("classList",JSON.stringify(data.class));
        			}else{
        				$scope.classList = '';
        				localStore.setItem("classList",'');
        			}
        		});
        		//flushing old values
        $scope.ngReload = function(){
        	$scope.teacher = '';
        	$scope.student = '';
        }
		$scope.saveTeacher = function(teacher){
			console.log("teacher details",teacher)
			var responseData = $http.post('http://192.168.0.129:3808/teacherReg',teacher);
			responseData.success(function(data){
				if(data.status == '200'){
					alert("Teacher added successfully");
					window.location.reload();
				}else{
					console.log("data",data);
					console.log("fail");

				}
			});
		}

		$scope.updateStudent = function(student){
			console.log("student",student.class)
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

		$scope.getTeacherInfo = function(teacher){
			$scope.viewTeacher = 'true';
			$scope.teacher = teacher;
		}
				
		$scope.editTeacherInfo = function(obj){
			console.log("editTeacherInfo------",obj.class);
			var countryName = $scope.countryArray[obj.country]
			console.log($scope.countryArray.indexOf(countryName))
			obj.country = $scope.countryArray.indexOf(countryName).toString();
			$scope.getState(obj.country);
			var intArr = [];
			if(obj.class != null || obj.class != undefined){
				var temp = obj.class.split(",");
				for(var i=0;i<temp.length;i++){
					for(var j=0;j<$scope.classList.length;j++){
						if($scope.classList[j].classNumber == temp[i]){
							intArr.push(parseInt($scope.classList[j].id));
						}
					}
				}
				obj.class = intArr;
			}else{
				obj.class = [];
			}
			$scope.editTeacher = 'true';
			
			$scope.teacher = obj;
		}


		$scope.updateTeacher = function(teacher){
			console.log("teacher info",teacher);
			if( teacher.class == null){
				 teacher.class = [];
			}
			var responseData = $http.post('http://192.168.0.129:3808/updateTeacher',teacher);
			responseData.success(function(data){
				if(data.status == '200'){
					console.log("success",data)
					console.log("saved details",teacher);
					alert("Teacher updated successfully");
					window.location.reload();
				}else{
					alert("Failed to update")
				}
			});

		}
		$scope.deleteTeacher = function(id){
			var params = {}
			params['teacherId'] = id;
			params['id'] = localStore.getItem("adminId");
			params['type'] = 'teacher';
			console.log("teacher deleting",params)
			if (confirm("confirm your deletion !") == true) {
				var responseData = $http.post('http://192.168.0.129:3808/deleteTeacher',params);
				responseData.success(function(data){
					if(data.status == '200'){
						alert("deletion successfull");
						window.location.reload();
					}else{
						alert("problem while deleting")
					}
				});
			}
			

		}

		$scope.saveClass = function(obj){
			console.log("dfasdf")
			var responseData = $http.post('http://192.168.0.129:3808/editClass',obj);
			responseData.success(function(data){
				if(data.status == '200'){
					alert("Editing class is successfull");
					window.location.reload();
				}else{
					alert("Problem while editing");
				}
			});
		}

		$scope.add = function(obj){
			console.log("sdf")
			var responseData = $http.post('http://192.168.0.129:3808/addClass',obj);
			responseData.success(function(data){
				if(data.status == '200'){

					alert(data.statusMessage);
					window.location.reload();
				}else{
					alert(data.statusMessage);
				}
			});
		}

		$scope.deleteClass = function(obj){
			console.log("obj",obj)
			if (confirm("confirm your deletion !") == true) {
				var responseData = $http.post('http://192.168.0.129:3808/deleteClass',obj);
				responseData.success(function(data){
					if(data.status == '200'){
						alert("deletion successfull");
						window.location.reload();
					}else{
						console.log("data",data);
						alert("problem while deleting")
					}
				});
			}
		}

		// $scope.editClass = function(obj){
		// 	$scope.editClass = 'true';
		// 	console.log("obj",obj)
		// }
	}

	var app = angular.module('schoolWebsite');
	app.controller('administrationController',["$scope","$http","$filter","countryState",administrationController]);
}());