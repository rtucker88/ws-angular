/* global io */
'use strict';

angular.module('wsAngularDemoApp')
    .service('chatService', function chatService($rootScope) {
        var socket;

        function listenToEvents(ws) {
            ws.on('message', function(data) {
                // Broadcast our message received
                $rootScope.$broadcast('message', data);
              });
          }

        /**
         * Connect to the chat server
         */
        this.connect = function () {
            socket = io.connect('http://localhost');
            listenToEvents(socket);
          };

        /**
         * Disconnect from socket.io
         */
        this.disconnect = function () {
            if (socket) {
              socket.disconnect();
            }
          };

        /**
         * Sends a message
         * @param sender the sender
         * @param message the message to send
         */
        this.sendMessage = function(sender, message) {
            if(socket) {
              socket.emit('message', { sender: sender, message: message });
            }
          };
      });
