/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
(function(){
    var validate = function(){
        var checkParam = function(key,value,type,callback){
            switch(type){
                case "name" : callback(checkName(key,value));break;
                case "email" : callback(checkEmail(key,value));break;
                case "password" : callback(checkName(key,value));break;
                case "phone" : callback(checkPhone(key,value));break;
                case "address" : callback(checkifExists(key,value));break;
                case "zip" : callback(checkZip(key,value));break;
                case "array" : callback(checkArray(key,value));break;
                case "check" : callback(checkifExists(key,value));break;
            };
            
            function checkifExists(k,val){
                if(val){
                    return {"valid":true};
                }else{
                    return {"valid":false,"errorMessage":k+" should not be empty"};
                }
            }
            
            function checkEmail(k,val){
                var isExist = checkifExists(k,val);
                if(isExist.valid == true){
                    var em_pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                    if(em_pattern.test(val)){
                        return {"valid":true};
                    }else{
                        return {"valid":false,"errorMessage":" Please enter a valid email"};
                    }
                }else{
                    return isExist;
                }
            }
            
            function checkName(k,val){
                var isExist = checkifExists(k,val);
                if(isExist.valid == true){
                    var em_pattern="";
                    var er_msg = "";
                    if(k === "City"){
                        em_pattern = /^[a-zA-Z ,.'-]+$/i;
                        er_msg = "numbers and special charecters except(',','.','-')";
                    }else if(k === "Password"){
                        em_pattern =  /^[^ /]+$/;
                        er_msg = "space and slash";
                    }else{
                        em_pattern = /^[a-zA-Z0-9 ,.'-]+$/i;
                        er_msg = "special charecters except(',','.','-')";
                    }
                    
                    if(em_pattern.test(val)){
                        return {"valid":true};
                    }else{
                        return {"valid":false,"errorMessage":k+" should not contain "+er_msg};
                    }
                }else{
                    return isExist;
                }
            }
            
            function checkZip(k,val){
                var isExist = checkifExists(k,val);
                if(isExist.valid == true){
                    var zip_pattern = /^[\d -]+$/;
                    if(zip_pattern.test(val)){
                        if(val.length<4){
                            return {"valid":false,"errorMessage":"Zip/Postal code should have atleast 4 digits"};
                        }else if(val.length>=4 && val.length<=6){
                            return {"valid":true};
                        }else{
                            return {"valid":false,"errorMessage":"Zip/Postal code should not exceed 6 digits."};
                        }
                    }else{
                        return {"valid":false,"errorMessage":"Zip/Postal code should contain numbers only"};
                    }
                }else{
                    return isExist;
                }
            }
            
            function checkPhone(k,val){
                var isExist = checkifExists(k,val);
                if(isExist.valid == true){
                    var pn_pattern = /^[\d -]+$/;
                    if(pn_pattern.test(val)){
                        if(val.length<10){
                            return {"valid":false,"errorMessage":key+" should have atleast 10 digits"};
                        }else if(val.length>=10 && val.length<=16){
                            return {"valid":true};
                        }else{
                            return {"valid":false,"errorMessage":key+" should not exceed 16 digits"};
                        }
                    }else{
                        return {"valid":false,"errorMessage":key+" should contain only numbers"};
                    }
                }else{
                    return isExist;
                }
            }
            
            function checkArray(k,v){
                if(angular.isArray(v) && v.length>0){
                    return {"valid":true};
                }else{
                    return {"valid":false,"errorMessage":"Please select "+k+""};
                }
            }
        };
        
        return {
            "checkParam" : checkParam
        };
    };
    
    var app = angular.module("rhyton");
    app.factory("validate",validate);
}());