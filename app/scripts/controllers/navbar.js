'use strict';

angular.module('kareoticketApp')
  .controller('NavbarCtrl', function ($scope, $location, $dialog) {
    $scope.menu = [{
      'title': 'Add Project',
      'link': '/'
    }];
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.opts = {
	    backdrop: true,
	    keyboard: true,
	    backdropClick: true,
	    templateUrl:  'partials/podio-request-form.html',
	  };

  	 $scope.openDialog = function(){
	    var d = $dialog.dialog($scope.opts);
	    //d.setErrorDetails("Server Error 500", "Some exception text"); // not working
	    d.open().then(function(result){
	      if(result)
	      {
	        alert('dialog closed with result: ' + result);
	      }
	    });
	  };

  });
