'use strict';

angular.module('wsAngularDemoApp')
    .controller('UsersCtrl', function ($scope, UsersService) {
        $scope.users = [];

        $scope.$watch(function() { return UsersService.users; }, function(val) {
            $scope.users = val;
        }, true);
    });
