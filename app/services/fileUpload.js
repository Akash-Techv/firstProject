(function(){
    var imgProcess = function($http,config,$alert,$timeout){
        
        var imgUpload = function(u_string,params,cb){
            $.ajax({
                url: config.url(u_string),
                data: params,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function(data){
                    if(data.statusCode === "200"){
                        cb(data);
                    }else{
                        if(data.statusMessage === "Please send a valid token!!"){
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
                },error: function(){
                    cb({"statusCode":"400","statusMessage":"Connection could not be established. Please try again."});
                }
            });
        };
        
        return {
            "imgUpload" : imgUpload
        }
    };
    
    var app = angular.module('rhyton');
    app.factory("imgProcess",["$http","config","$alert","$timeout",imgProcess]);
}());