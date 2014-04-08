'use strict';

angular.module('wsAngularDemoApp')
    .service('UsersService', function chatService($rootScope) {
        // Array to hold our users
        this.users = [];

        var self = this;

        function userJoined(event, data) {
            console.log('user joined', data);
            self.users.push(data);
        }

        function userLeft(event, data) {
            console.log('user left', data);
        }

        function userEdited(event, data) {
            console.log('user edited', data);
            for(var i = 0; i < self.users.length; i++) {

            }
        }

        $rootScope.$on('userJoined', userJoined);
        $rootScope.$on('userLeft', userLeft);
        $rootScope.$on('userEdited', userEdited);

        return this;
    });
