'use strict';

angular.module('kareoticketApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
