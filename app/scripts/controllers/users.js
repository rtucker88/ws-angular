'use strict';

angular.module('wsAngularDemoApp')
    .controller('UsersCtrl', function ($scope, UsersService) {
        $scope.users = UsersService.users;
    });
