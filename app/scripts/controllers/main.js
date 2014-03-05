'use strict';

angular.module('kareoticketApp')
  .controller('MainCtrl', function ($scope, $http, socket) {

    $scope.results = [];
    $scope.projects = [];
    $scope.archivedProjects = [];

    $scope.orderField = 'created_on';
    $scope.selectedSort = 'Submitted Date';
    $scope.reverseSort = true;
    $scope.sortFields = [{
      fieldName: 'priority_name',
      textName: 'Priority'
    },
    {
      fieldName: 'created_on',
      textName: 'Submitted Date'
    },
    {
      fieldName: 'fields.title',
      textName: 'Title'
    },
    {
      fieldName: 'stage_name',
      textName: 'Stage'
    }];


    $scope.selectedStage = [];
    $scope.stagesList = [{
      id: 1,
      name: 'Planning',
      cssClass: 'label-info'
    },
    {
      id: 2,
      name: 'In Progress',
      cssClass: 'label-primary'
    },
    {
      id: 3,
      name: 'Complete',
      cssClass: 'label-success'
    },
    {
      id: 5,
      name: 'Submitted',
      cssClass: 'label-danger'
    }
    ];

    $scope.selectedPriority = [];
    $scope.prioritiesList = [{
      id: 1,
      name: 'P1',
      cssClass: 'alert-danger'
    },
    {
      id: 2,
      name: 'P2',
      cssClass: 'alert-warning'
    },
    {
      id: 3,
      name: 'P3',
      cssClass: 'alert-info'
    }];

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

    $scope.setCss = function (id, list) {
      var cssClass = '';
      _.find(list, function(listItem) {
        if (listItem.id === id) {
          cssClass = listItem.cssClass;
        }
      });
      return cssClass;
    };

    $scope.checkAll = function () {
      $scope.selectedStage = _.pluck($scope.stagesList, 'id');
      $scope.selectedPriority = _.pluck($scope.prioritiesList, 'id');
    };

    $scope.orderByField = function (field) {
      $scope.orderField = field.fieldName;
      $scope.reverseSort = !$scope.reverseSort;
      $scope.selectedSort = field.textName;
    };

    $scope.isSortSelected = function (selectedSort) {
      if (selectedSort === $scope.selectedSort) {
        return true;
      }
      return false;
    };

    $scope.isArchivedShown = false;
    $scope.addArchived = function () {
      $scope.results = _.union($scope.results, $scope.archivedProjects);
      $scope.isArchivedShown = true;
    };
    $scope.removeArchived = function () {
      console.log('removed');
      $scope.results = _.difference($scope.results, $scope.archivedProjects);
      console.log($scope.results);
      $scope.isArchivedShown = false;
    };

    // get projects that are currently open
    $http.get('/podio/projects').
			success(function(data) {
				$scope.results = data;
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
