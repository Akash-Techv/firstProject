/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
(function(){
    var gmap_request = function($http){
        var getAddress = function(lat,lng,cb){
            var latlng = new google.maps.LatLng(lat, lng);
            var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        cb(results[0]);
                    }else{
                        cb({});
                    }
                }
            });
        };
        
        var getLocation = function(address,cb){
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK){
                    var lat = results[0].geometry.location.lat();
                    var lng = results[0].geometry.location.lng();
                    cb({"status":true,"loc":{"lat":lat,"lng":lng}});
                }else{
                    cb({"status":false});
                }
            });
        };
        
        return {
            "getAddress":getAddress,
            "getLocation":getLocation
        };
    };
    
    var app = angular.module('rhyton');
    app.factory("gmap_request",["$http",gmap_request]);
}());

