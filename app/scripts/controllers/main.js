'use strict';

angular.module('kareoticketApp')
  .controller('MainCtrl', function ($scope, $http, socket) {

    $scope.orderByField = 'created_on';
    $scope.reverseSortProjs = false;
    $scope.reverseSortArchivedProjs = false;

    $scope.selectedStage = [];
    $scope.stagesList = [{
      id: 1,
      name: 'Planning',
      cssClass: 'label label-info'
    },
    {
      id: 2,
      name: 'In Progress',
      cssClass: 'label label-primary'
    },
    {
      id: 3,
      name: 'Complete',
      cssClass: 'label label-success'
    }
    // {
    //   id: 4,
    //   name: 'Submitted',
    //   cssClass: 'label label-danger'
    // }
    ];

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

        $scope.setSelectedStage = function () {
          var id = this.stage.id;
          if (_.contains($scope.selectedStage, id)) {
            $scope.selectedStage = _.without($scope.selectedStage, id);
          } else {
            $scope.selectedStage.push(id);
            console.log($scope.selectedStage);
          }
          return false;
        };

        $scope.isPriorityChecked = function (id) {
        if (_.contains($scope.selectedPriority, id)) {
          return 'glyphicon glyphicon-ok pull-right';
        }
          return false;
        };

        $scope.isStageChecked = function (id) {
        if (_.contains($scope.selectedStage, id)) {
          return 'glyphicon glyphicon-ok pull-right';
        }
          return false;
        };

        $scope.checkAll = function () {
          $scope.selectedStage = _.pluck($scope.stagesList, 'id');
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

	});
