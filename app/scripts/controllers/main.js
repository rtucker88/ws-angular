'use strict';

angular.module('wsAngularDemoApp')
  .controller('MainCtrl', function ($scope, $http, SocketService) {
      $scope.connect = function connect() {
        SocketService.connect();
      };

      $scope.disconnect = function disconnect() {
        SocketService.disconnect();
      };

      $scope.getConnectButtonText = function connectButton() {
        if(SocketService.isConnected) {
            return 'Disconnect';
        } else {
            return 'Connect';
        }
      };

      $scope.connectClick = function connectClicked(userName) {
          if(SocketService.isConnected) {
              SocketService.disconnect();
          } else {
              SocketService.connect(userName);
          }
      };

      $scope.$watch(function() { return SocketService.isConnected; }, function(val) {
          $scope.isConnected = val;
      });
  });
