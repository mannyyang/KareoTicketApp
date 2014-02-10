'use strict';

angular.module('kareoticketApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },
    {
			'title': 'Podio',
			'link': '/podio'
    }];
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
