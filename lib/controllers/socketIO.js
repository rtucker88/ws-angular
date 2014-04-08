'use strict';

module.exports = function(server) {
    var crypto = require('crypto');
    var io = require('socket.io').listen(server);
    var _ = require('lodash');
    var usersList = [];

    function createRandomId() {
        var current_date = (new Date()).valueOf().toString();
        var random = Math.random().toString();
        var hash = crypto.createHash('sha1').update(current_date + random).digest('hex');
        return hash;
    }

    function createNewUser(socket) {
        // Create the users id and send it out to the user
        var socketId = createRandomId();
        socket.set('id', socketId);
        socket.emit('userId', {id: socketId});
        var user = {
            id: socketId
        };
        usersList.push(user);
    }

    var chat = io.of('/chat').on('connection', function(socket) {
        socket.on('message', function(data) {
            // Relay the message back out
            socket.get('id', function(err, id) {
                socket.get('name', function(err, name) {
                    console.log('sending message', data);
                    var date = new Date();
                    data.date = date.getTime();
                    data.id = id;
                    data.sender = name;
                    chat.emit('message', data);
                });
            });
        });
    });

    var users = io.of('/users').on('connection', function(socket) {
        createNewUser(socket);
        // Send out the current user list to the new user
        socket.emit('userList', usersList);

        socket.on('userEdited', function(data) {
            socket.set('name', data.name);
            socket.get('id', function(err, id) {
                data.id = id;

                // Update the usersList
                var index = _.findIndex(usersList, function(user) {
                   return user.id === id;
                });
                if(index > -1) {
                    usersList[index].name = data.name;
                }
                users.emit('userEdited', data);
            });
        });

        socket.on('disconnect', function() {
            console.log('user disconnected');
            socket.get('id', function(err, id) {
                // Remove the  user from the usersList
                var index = _.findIndex(usersList, function(user) {
                    return user.id === id;
                });
                if(index > -1) {
                    usersList.splice(index, 1);
                }

                users.emit('userLeft', {id: id});
            });
        });

        socket.on('reconnect', function() {
            socket.get('id', function(err, id) {
                console.log('emiting userId...');
                socket.emit('userId', {id: id});
                var user = {
                    id: id
                };
                usersList.push(user);
                socket.emit('userList', usersList);
                socket.get('name', function(err, name) {
                   var data = {id: id, name: name};
                    socket.emit('userEdited', data);
                });
            });
        });
    });
};