'use strict';

angular.module('kareoticketApp')
  .controller('PodioFormCtrl', function ($scope, $modal, socket) {

   $scope.open = function () {

    var modalInstance = $modal.open({
      templateUrl: 'partials/podio-request-form.html',
    });

  };

	});
