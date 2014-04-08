'use strict';

module.exports = function(server) {
    var crypto = require('crypto');
    var io = require('socket.io').listen(server);

    function createRandomId() {
        var current_date = (new Date()).valueOf().toString();
        var random = Math.random().toString();
        var hash = crypto.createHash('sha1').update(current_date + random).digest('hex');
        return hash;
    }

    var chat = io.of('/chat').on('connection', function(socket) {
        socket.on('message', function(data) {
            // Relay the message back out
            socket.get('id', function(err, id) {
                var date = new Date();
                data.date = date.getTime();
                data.id = id;
                socket.broadcast.emit('message', data);
            });
        });
    });

    var users = io.of('/users').on('connection', function(socket) {
        // Create the users id and send it out to the user
        var socketId = createRandomId();
        socket.set('id', socketId);
        socket.emit('userId', {id: socketId});

        socket.on('userEdited', function(data) {
            socket.set('name', data.name);
            socket.get('id', function(err, id) {
                data.id = id;
                socket.broadcast.emit('userJoined', data);
            });
        });

        // Send out the current user list to the new user
        socket.emit('userList', {});

        users.on('disconnect', function() {
            socket.broadcast.emit('user disconnected');
        });
    });
};