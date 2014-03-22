'use strict';

angular.module('wsAngularDemoApp')
  .controller('MainCtrl', function ($scope, $http, chatService) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      chatService.connect();
      $scope.$on('message', function(event, data) {
        console.log('message received!', data);
      });
      $scope.awesomeThings = awesomeThings;
    });
  });
