(function(){
    var request = function($http,config,$alert,$timeout){
        
        var postService = function(u_string,params,type,cb){
            $http[type](config.url(u_string),params)
                .success(function(data,status) {//data, status, headers, config
                    if(data.statusCode === "200"){
                        cb(data);
                    }else{
                        if(data.statusMessage === "Please send a valid token!!" ){
                            rhyton_store.clear();
                            $alert({title:"You are already logged in on another browser.",content:"You will be logged out automaticaly. Please login again.",placement:'top',type:"info",show: true});
                            $timeout(function(){
                                window.location.hash = '/';            
                                window.location.reload();
                            },3000);
                        }else{
                            cb(data);
                        }
                    }
                })
                .error(function() {//data, status, headers, config
                    cb({"statusCode":"400","statusMessage":"Connection could not be established. Please try again."});
                });
        };
        
        return {
            "postService" : postService
        }
    };
    
    var app = angular.module('rhyton');
    app.factory("request",["$http","config","$alert","$timeout",request]);
}());
