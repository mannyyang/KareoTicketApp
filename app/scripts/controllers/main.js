'use strict';

angular.module('kareoticketApp')
  .controller('MainCtrl', function ($scope, $http, socket) {

    $scope.orderByField = 'created_on';
    $scope.reverseSortProjs = false;
    $scope.reverseSortArchivedProjs = false;

    $scope.stages={
      'Complete': 'label label-success',
      'Submitted': 'label label-danger',
      'In Progress': 'label label-primary',
      'Planning': 'label label-info',
      'Archived': 'label label-default'
    };

    $scope.selectedPriority = [];
    $scope.prioritiesList = [{
      id: 1,
      name: 'P1'
    },
    {
      id: 2,
      name: 'P2'
    },
    {
      id: 3,
      name: 'P3'
    }];

    // get projects that are currently open
    $http.get('/podio/projects').
			success(function(data) {
				$scope.projects = data;

        $scope.setSelectedPriority = function () {
          var id = this.priority.id;
          if (_.contains($scope.selectedPriority, id)) {
            $scope.selectedPriority = _.without($scope.selectedPriority, id);
          } else {
            $scope.selectedPriority.push(id);
            console.log($scope.selectedPriority);
          }
          return false;
        };

        $scope.isChecked = function (id) {
        if (_.contains($scope.selectedPriority, id)) {
          return 'glyphicon glyphicon-ok pull-right';
        }
          return false;
        };

        $scope.checkAll = function () {
          $scope.selectedPriority = _.pluck($scope.prioritiesList, 'id');
        };

        $scope.isReversed = function (reservedSort) {
        if (reservedSort) {
          return 'glyphicon glyphicon-chevron-up';
        }
          return 'glyphicon glyphicon-chevron-down';
        };


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

	})
  .filter('priorityFilter', [function () {
    return function (projects, selectedPriority) {
      if (!angular.isUndefined(projects) && !angular.isUndefined(selectedPriority) && selectedPriority.length > 0) {
        var tempProjects = [];
        angular.forEach(selectedPriority, function (id) {
          angular.forEach(projects, function (project) {
            if (angular.equals(project.fields.priority.id, id)) {
              tempProjects.push(project);
            }
          });
        });
        return tempProjects;
      } else {
        return projects;
      }
    };
  }]);
