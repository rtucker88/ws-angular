'use strict';

angular.module('wsAngularDemoApp').controller('ChatCtrl',
    function ($scope, ChatService, SocketService) {
        $scope.messages = ChatService.messages;

        function sendMessage(message) {
            ChatService.sendMessage(message);

            // Clear the message
            $scope.msgToSend = '';
        };

        $scope.sendMessage = sendMessage;

        $scope.messageKeyUp = function messageKeyUp($event, message) {
            // Enter key and a valid form (something entered) to send
            if ($event.keyCode === 13 && $scope.userForm.$valid) {
                sendMessage(message);
            }
        };

        $scope.$watch(function() { return SocketService.isConnected; }, function(val) {
            $scope.isConnected = val;
        }, true);
    });
