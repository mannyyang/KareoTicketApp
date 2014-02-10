// 'use strict';

// angular.module('kareoticketApp')
//   .controller('MainCtrl', function ($scope, $http) {
//     $http.get('/api/awesomeThings').success(function(awesomeThings) {
//       $scope.awesomeThings = awesomeThings;
//     });
//   });
'use strict';

angular.module('kareoticketApp')
  .controller('MainCtrl', function ($scope, $http, socket) {


		// $http.get('/api/awesomeThings').
		// 	success(function(awesomeThings) {
		// 		$scope.awesomeThings = awesomeThings;
		// 	}).
  //     error(function () {
  //       // called asynchronously if an error occurs
  //       // or server returns response with an error status.
  //       console.log('error get');
  //     });

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

    socket.on('ready', function(){
      console.log('socket yes');
		});

  //   $http({method: 'GET', url: '/api/get'}).
  //     success(function (data, status, headers, config) {
  //       // this callback will be called asynchronously
  //       // when the response is available
  //       console.log(data);
  //       $scope.data = data;
  //     }).
			// error(function (data, status, headers, config) {
			// 	// called asynchronously if an error occurs
  //       // or server returns response with an error status.
  //       console.log('error get');
  //     });
	});
