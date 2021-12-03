const express = require('express');
const http = require('http');
const app = express();
const clientPath = `${__dirname}/../client`
app.use(express.static(clientPath));
const server = http.createServer(app);
let userArr = [];

server.listen(8080, () =>{
    console.log("server running on 8080");
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    io.emit('logAllUsers', (userArr));
    socket.on('sendToAll', (message) =>{
        io.emit("displayMessage", (message));
    });
    socket.on('sendToMe', (message) =>{
        socket.emit("displayMessage", (message));
    });
    socket.on('logUser', (user) =>{
        socket.user = user;
        userArr.push(socket.user);
        io.emit("logUserInChat", (socket.user));
        io.emit("logAllUsers", (userArr));
    });
    socket.on('disconnect', () =>{
        io.emit("userLeft", (socket.user));
        for (let i = 0; i < userArr.length; i++) {
            if (userArr[i] === socket.user) {
                userArr.splice(i, 1);
            }
        }
        io.emit("remainingUsers", (userArr));
    });
});