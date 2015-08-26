/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
(function(){
    var app = angular.module("schoolWebsite",["ngRoute","ngAnimate","ngSanitize","mgcrea.ngStrap"]);
        app.config(function($routeProvider){
            $routeProvider
                .when('/addForm',{
                    templateUrl:'views/form.html',
                    controller:'formCtrl'
                })
                .when('/student_signIn',{
                    templateUrl:'views/studentLogin.html',
                    controller:'studentLoginController'

                })
                .when('/admissionForm',{
                    templateUrl: 'views/admissionForm.html',
                    controller:'admissionFormController'
                })
                .when('/admin_signIn',{
                    templateUrl: 'views/adminLogin.html',
                    controller: 'adminLoginController'
                })
                .when('/administration',{
                    templateUrl: 'views/administration.html',
                    controller: 'administrationController'
                })
                .when('/contactUs',{
                    templateUrl: 'views/contactUs.html',                   
                })
                
                .otherwise({redirectTo:"/"});
        });

}());
var localStore = window.localStorage;
