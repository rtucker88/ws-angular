'use strict';

angular.module('wsAngularDemoApp')
    .service('ChatService', function chatService($rootScope, SocketService, UsersService) {
        // Array to hold our messages
        this.messages = [];

        var self = this;

        /**
         * Updates our message array
         * @param event
         * @param data
         */
        function messageReceived(event, data) {
            console.log('got message', data);

            // Filter out our own messages
            if(UsersService.myUser.id !== data.id) {
                self.messages.push(data);
            }
        }

        /**
         * Sends a message
         * @param message the message to send
         */
        function sendMessage(message) {
            var messageToSend = {
                sender: UsersService.myUser.name,
                message: message
            };

            // Append to our message list
            self.messages.push(messageToSend);

            // Send the actual message
            SocketService.sendMessage(messageToSend);
        }

        $rootScope.$on('message', messageReceived);

        this.sendMessage = sendMessage;

        return this;
    });
