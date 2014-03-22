'use strict';

module.exports = function(server) {
    var io = require('socket.io').listen(server);

    io.sockets.on('connection', function(socket) {
        socket.emit('news', { hello: 'world'});
        socket.on('my other event', function(data) {
           console.log('my other event', data);
        });

        setInterval(function() {
            socket.emit('message', { message: "abc123", sender: "bob"});
        }, 2500);
    });
};