(function(){
	
	var app = angular.module('rhyton');

	app.factory('socket', ['$rootScope', function ($rootScope) {
	    var socket = io.connect('http://52.26.211.90:3000');
	    console.log("socket created");
	 
	    return {
	        on: function (eventName, callback) { // for broadcasting purpose
	            function wrapper() {
	                var args = arguments;
	                $rootScope.$apply(function () {
	                    callback.apply(socket, args);
	                });
	            }
	 
	            socket.on(eventName, wrapper);
	 
	            return function () {
	                socket.removeListener(eventName, wrapper);
	            };
	        },
	 
	        emit: function (eventName, data, callback) { // for receiving purpose
	            socket.emit(eventName, data, function () {
	                var args = arguments;
	                $rootScope.$apply(function () {
	                    if(callback) {
	                        callback.apply(socket, args);
	                    }
	                });
	            });
	        }
	    };
	}]);
	
}());


