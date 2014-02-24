'use strict';

angular.module('kareoticketApp')
  .filter('priorityFilter', [function () {
    return function (projects, selectedPriority) {
      if (!angular.isUndefined(projects) && !angular.isUndefined(selectedPriority) && selectedPriority.length > 0) {
        var tempProjects = [];
        angular.forEach(selectedPriority, function (id) {
          angular.forEach(projects, function (project) {
            if (angular.equals(project.priority_id, id)) {
              tempProjects.push(project);
            }
          });
        });
        return tempProjects;
      } else {
        return projects;
      }
    };
  }])
  .filter('stageFilter', [function () {
    return function (projects, selectedStage) {
      if (!angular.isUndefined(projects) && !angular.isUndefined(selectedStage) && selectedStage.length > 0) {
        var tempProjects = [];
        angular.forEach(selectedStage, function (id) {
          angular.forEach(projects, function (project) {
            if (angular.equals(project.stage_id, id)) {
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
