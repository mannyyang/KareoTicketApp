'use strict';

angular.module('kareoticketApp')
  .controller('NavbarCtrl', function ($scope, $location, $modal) {
		$scope.menu = [{
		  'title': 'Add Project',
		  'link': '/'
		}];
		
		$scope.isActive = function(route) {
		  return route === $location.path();
		};

	 	$scope.addProject = function () {

	    var modalInstance = $modal.open({
	      templateUrl: 'partials/podio-request-form',
	      controller: 'PodioFormCtrl'
	    });

	    modalInstance.opened.then(function(){

	    	var timerID = 0;

	    	timerID = setInterval(function(){
	    		if ($("#Podio-form").length > 0){
					  _podioWebForm.render("430233");
					  clearInterval(timerID);
					}
	    	}, 500);
	    	
	    }, function(){
	    	console.log('fail open');
	    });

  	};


});
