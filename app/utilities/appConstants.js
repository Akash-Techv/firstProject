/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

 //panel_obj keys and list_obj keys should be same

 //panel_obj values are for display purpose only

 //list_obj values and activePanelSet keys should be same and should match with  routes /keys

 //adminPanels elemets should be like panel_obj keys [ that have to be hidden for admin login]
(function(){
    var app = angular.module('rhyton');
    app.constant("appConstants",{
        "panel_obj" : {
            "User": ["Users List","Add User"],
            "Organization": ["Organizations List","Add Organization"],
            "Organization Type": ["Organization Types List","Add Organization Type"],
            "Service Type": ["Service Type List","Add Service Type"],
            "IOT Devices": ["IOT Device List","Add IOT Device"],
            "Alert Instruction": ["Alerts List","Set Alert"],
            "Message": ["Messages List","Send Message"],
            "Settings":["Profile","Change Password"]
        },
        "list_obj":{
            "User": ["users","addUser"],
            "Organization": ["organizations","addOrganization"],
            "Organization Type": ["organizationTypes","addOrganizationType"],
            "Service Type": ["services","addService"],
            "IOT Devices": ["iots","addiot"],
            "Alert Instruction": ["alert","setAlert"],
            "Message": ["messages","sendMessage"],
            "Settings":["profile","changePassword"]
        },
        "activePanelSet":{
            "dashboard":0,
            "users":1,
            "addUser":1,
            "organizations":2,
            "addOrganization":2,
            "organizationTypes":3,
            "addOrganizationType":3,
            "services":4,
            "addService":4,
            "iots":5,
            "addiot":5,
            "alert":6,
            "setAlert":6,
            "messages":7,
            "sendMessage":7,
            "profile":8,
            "changePassword":8
        },
        "adminPanels":["Organization Type","Service Type","IOT Devices"],
        "iotNames":["Beacon","DoorLock","Siren"]
    });
}());