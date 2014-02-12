'use strict';

angular.module('kareoticketApp')
  .controller('MainCtrl', function ($scope, $http, socket) {

    $scope.orderByField = 'created_on';
    $scope.reverseSortProjs = false;
    $scope.reverseSortArchivedProjs = false;

    // get projects that are currently open
    $http.get('/podio/projects').
			success(function(data) {
				$scope.projects = data;
        console.log(data);
			}).
      error(function () {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log('error get');
      });

    // get projects that are archived
    $http.get('/podio/projects/archived').
      success(function(data) {
        $scope.archivedProjects = data;
        console.log(data);
      }).
      error(function () {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log('error get');
      });

    socket.on('ready', function(){
      console.log('socket yes');
		});

	});
