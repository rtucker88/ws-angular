'use strict';

angular.module('wsAngularDemoApp')
    .controller('ChatCtrl', function ($scope, ChatService) {
       $scope.messages =  ChatService.messages;

       $scope.sendMessage = function sendMessage(message) {
           console.log('sending message', message);
           ChatService.sendMessage(message);
       }
    });
