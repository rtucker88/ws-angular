'use strict';

angular.module('wsAngularDemoApp')
  .controller('MainCtrl', function ($scope, $http, socketService) {
      $scope.connect = function connect() {
        socketService.connect();
      };

      $scope.disconnect = function disconnect() {
        socketService.disconnect();
      };

      $scope.getConnectButtonText = function connectButton() {
        if(socketService.isConnected) {
            return 'Disconnect';
        } else {
            return 'Connect';
        }
      };

      $scope.connectClick = function connectClicked() {
          if(socketService.isConnected) {
              socketService.disconnect();
          } else {
              socketService.connect();
          }
      };
  });
