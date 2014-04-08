'use strict';

angular.module('wsAngularDemoApp')
  .controller('NavbarCtrl', function ($scope, $location, SocketService) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.isConnected = function isConnected() {
      if(SocketService.isConnected) {
          return 'Connected';
      } else {
          return 'Disconnected';
      }
    };
  });
