const express = require('express');
const http = require('http');
const app = express();
const clientPath = `${__dirname}/../client`
app.use(express.static(clientPath));
const server = http.createServer(app);

server.listen(8080, () =>{
    console.log("server running on 8080");
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    socket.on('sendToAll', (message) =>{
        io.emit("displayMessage", (message));
    });
    socket.on('sendToMe', (message) =>{
        socket.emit("displayMessage", (message));
    });
    socket.on('logUser', (user) =>{
        socket.user = user;
        io.emit("displayUser", (user));
    })
    socket.on('disconnect', () =>{
        io.emit("userLeft", (socket.user))
    });
});