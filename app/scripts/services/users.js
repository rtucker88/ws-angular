'use strict';

angular.module('wsAngularDemoApp')
    .service('UsersService', function chatService($rootScope) {
        // Array to hold our users
        this.users = [];
        this.myUser = {};

        var self = this;

        function userJoined(event, data) {
            console.log('user joined', data);
            self.users.push(data);
        }

        function userLeft(event, data) {
            console.log('user left', data);
            // Remove the user from our array
            for(var i = 0; i < self.users.length; i++) {
                if(self.users[i].id === data.id) {
                    console.log('found user with id', data.id);
                    self.users.splice(i, 1);
                }
            }
        }

        function userEdited(event, data) {
            console.log('user edited', data);

            if(self.myUser.id === data.id) {
                console.log('setting my name to', data.name);
                self.myUser.name = data.name;
            }

            var found = false;
            for(var i = 0; i < self.users.length; i++) {
                if(self.users[i].id === data.id) {
                    self.users[i].name = data.name;
                    found = true;
                    break;
                }
            }

            if(!found) {
                self.users.push(data);
            }
        }

        function userList(event, data) {
            console.log('user list', data);
            self.users = data;
        }

        function setUserId(event, data) {
            console.log('user id', data);
            self.myUser.id = data.id;
        }

        function disconnected() {
            self.users = [];
            self.myUser = {};
        }

        function reconnected(event, name) {
            self.myUser.name = name;
        }

        $rootScope.$on('userJoined', userJoined);
        $rootScope.$on('userLeft', userLeft);
        $rootScope.$on('userEdited', userEdited);
        $rootScope.$on('userList', userList);
        $rootScope.$on('userId', setUserId);
        $rootScope.$on('disconnected', disconnected);
        $rootScope.$on('reconnected', reconnected);

        return this;
    });
