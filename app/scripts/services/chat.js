'use strict';

angular.module('wsAngularDemoApp')
    .service('ChatService', function chatService($rootScope, socketService) {
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
            self.messages.push(data);
        }

        /**
         * Sends a message
         * @param message the message to send
         */
        function sendMessage(message) {
            // Append to our message list
            self.messages.push({
                sender: 'Me',
                message: message
            });

            // Send the actual message
            socketService.sendMessage(message);
        }

        $rootScope.$on('message', messageReceived);

        this.sendMessage = sendMessage;

        return this;
    });
