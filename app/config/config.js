/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
(function(){
    
    var config = function(){
        var configObj = {
                "protocol":"http",// protocol http (or) https
                //"host":"192.168.0.195",//ip addressor domain name of machine hosting the server
                "host":"52.26.211.90",//ip addressor domain name of machine hosting the server
                "port":"8080",//port of the server
                "prefix":"/RhytonPoC",
                "socketPort":"3000",
                //"prefix":"/RhytonPoC-Local",
                "paths":{//key is string to be used to access and value will be particular method/action on server
                    "login":"/user/adminLogin",
                    "logout":"/user/logout",
                    "register":"/user/register",
                    "superAdminRegister":"/user/superAdminRegister",
                    "servicesList":"/services/getServicesList",
                    "addService":"/services/insertService",
                    "orgTypeList":"/orgType/getOrgTypeList",
                    "addOrgType":"/orgType/insertOrgType",
                    
                    
                    "orgList":"/orgInfo/getOrgsList",
                    "sa_orgList":"/orgInfo/getAllOrgsInfo",
                    
                    "basicInfo":"/orgInfo/addBasicOrgInfo",
                    "getBasicOrgInfoById":"/orgInfo/getBasicOrgInfoById",
                    "updateBasicInfo":"/orgInfo/updateBasicOrgInfo",
                    
                    "roomConfig":"/orgInfo/addRoomConfig",
                    "getRoomConfigById":"/orgInfo/getRoomConfigById",
                    "updateRoomConfig":"/orgInfo/updateRoomConfig",
                    
                    "roomNames":"/orgInfo/getRoomCodesByOrgId",
                    
                    "beaconConfig":"/orgInfo/addBeaconConfig",
                    "getBeaconConfigById":"/orgInfo/getBeaconConfigById",
                    "updateBeaconConfig":"/orgInfo/updateBeaconConfig",
                    
                    "iotConfig":"/orgInfo/addOrUpdateIOTConfig",
                    "getiotConfig":"/orgInfo/getIOTConfigById",
                    
                    "distanceConfig":"/orgInfo/addDistanceConfig",
                    "getDistanceConfigById":"/orgInfo/getDistanceConfigById",
                    "updateDistance":"/orgInfo/updateDistanceConfig",
                    
                    "deleteOrg":"/orgInfo/deleteOrgInfo",
                    
                    "getUsersList":"/user/getUsersList",
                    "getTotalOrgs":"/orgInfo/getTotalOrgs",
                    "getOrgIdnNames":"/orgInfo/getOrgIdAndNameByUserId",
                    "getRooms":"/orgInfo/getRoomConfigById",
                    "updateUser":"/user/updateUser",
                    "insertIotDevice":"/iotDevice/insertIotDevice",
                    "getIotDevicesList":"/iotDevice/getIotDevicesList",
                    "getAdminListByOrgId": "/orgInfo/getAdminListByOrgId",
                    "getAgentListByOrgId" : "/orgInfo/getAgentListByOrgId",
                    "editIotDevice":"/iotDevice/editIotDevice",
                    "updateService":"/services/updateService",
                    "updateOrgType":"/orgType/updateOrgType",
                    "deleteIOTDevice":"/iotDevice/deleteIOTDevice",
                    "deleteService":"/services/deleteService",
                    "deleteOrgType":"/orgType/deleteOrgType",
                    "getSuperAdminUsersList":"/user/getSuperAdminUsersList",
                    "deleteUser":"/user/deleteUser",
                    
                    "addAlertInstruction":"/alertInstructions/addAlertInstruction",
                    "getAlertInstruction":"/alertInstructions/getAlertInstruction",
                    "updateAlert":"/alertInstructions/updateAlertInstruction",
                    "deleteAlert":"/alertInstructions/deleteAlertInstruction",

                    "sendMessage":"/alarm/addMessage",
                    "getMsgList":"/alarm/getMessageDetails",
                    "editMessage":"/alarm/editMessage",
                    "deleteMessage":"/alarm/deleteMessage",

                    "getUserById":"/user/getUserById",
                    "editProfile":"/user/editProfile",
                    "changePassword":"/user/changePassword",
                    
                    "getUsersStatus":"/dashboard/getUsersStatus",
                    "getServiceMonitoring":"/dashboard/getServiceMonitoring",
                    "getIOTMonitoringDetails":"/dashboard/getIOTMonitoringDetails",
                    "resetAlarm":"/alarm/resetAlarm",
                    "getEventHistory":"/dashboard/getEventHistory",
                    "default_pic":"/defaultPic.gif"
                },
                "url": function(path){
                    //constructs url for ajax call using above key-values
                        if(configObj.paths.hasOwnProperty(path)){
                            return configObj.protocol+"://"+configObj.host+":"+configObj.port+configObj.prefix+configObj.paths[path];
                        }else{
                            return "invalid";
                        }
                },
                "debug_mode":true// enable/disable logs true/false
        };
        
        return configObj;
    };
    
    var module = angular.module("rhyton");
    module.factory("config",config);
    module.config(['$httpProvider', function($httpProvider) { //cross browser issue
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }
    ]);
}());