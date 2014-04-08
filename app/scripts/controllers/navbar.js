'use strict';

angular.module('wsAngularDemoApp')
  .controller('NavbarCtrl', function ($scope, $location, socketService) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.isConnected = function isConnected() {
      if(socketService.isConnected) {
          return 'Connected';
      } else {
          return 'Disconnected';
      }
    };
  });
