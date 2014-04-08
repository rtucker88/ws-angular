/* global io */
'use strict';

angular.module('wsAngularDemoApp')
    .service('SocketService', function chatService($rootScope) {
        var hasConnected = false;
        var chatSocket;
        var usersSocket;
        this.isConnected = false;

        /**
         * Listens for incoming chat events.
         * @param ws the websocket to listen on
         */
        function listenToChatEvents(ws) {
            ws.on('message', function (data) {
                // Broadcast our message received
                $rootScope.$apply(function() {
                    $rootScope.$broadcast('message', data);
                });
            });
        }

        /**
         * Listens for incoming user events
         * @param ws the websocket to listen on
         */
        function listenToUserEvents(ws) {
            ws.on('userJoined', function (data) {
                // Broadcast our message received
                $rootScope.$apply(function () {
                    $rootScope.$broadcast('userJoined', data);
                });
            });

            ws.on('userLeft', function (data) {
                // Broadcast our message received
                $rootScope.$apply(function () {
                    $rootScope.$broadcast('userLeft', data);
                });
            });

            ws.on('userEdited', function (data) {
                // Broadcast our message received
                $rootScope.$apply(function () {
                    $rootScope.$broadcast('userEdited', data);
                });
            });

            ws.on('userList', function (data) {
                // Broadcast our message received
                $rootScope.$apply(function () {
                    $rootScope.$broadcast('userList', data);
                });
            });

            ws.on('userId', function (data) {
                // Broadcast our message received
                $rootScope.$apply(function () {
                    $rootScope.$broadcast('userId', data);
                });
            });
        }

        /**
         * Connect to the chat server
         */
        this.connect = function (userName) {
            chatSocket = io.connect('http://localhost/chat');
            usersSocket = io.connect('http://localhost/users');

            listenToChatEvents(chatSocket);
            listenToUserEvents(usersSocket);

            this.isConnected = true;
            usersSocket.emit('userEdited', {name: userName});

            // Send a request for reconnect info
            if(hasConnected) {
                usersSocket.emit('reconnect');
                usersSocket.emit('userEdited', {name: userName});

                $rootScope.$broadcast('reconnected', userName);
            }

            hasConnected = true;
        };

        /**
         * Disconnect from socket.io
         */
        this.disconnect = function () {
            if (chatSocket) {
                chatSocket.disconnect();
            }
            if (usersSocket) {
                usersSocket.disconnect();
            }
            this.isConnected = false;

            // Disconnected message so we can clear out the userlist
            $rootScope.$broadcast('disconnected');
        };

        /**
         * Sends a message
         * @param message the message to send
         */
        this.sendMessage = function (message) {
            if (chatSocket) {
                chatSocket.emit('message', message);
            }
        };
    });
