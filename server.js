const express = require('express');
const app = express();
const { join } = require('path');
const http = require('http');
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

let todoList = [];

io.on('connection', (socket) => {
    console.log('user connected');

    socket.emit('updateTodos', todoList);

    socket.on('addTodo', (todo) => {
        todoList.push(todo);
        io.emit('updateTodos', todoList);
    });

    socket.on('removeTodo', (index) => {
        todoList.splice(index, 1);
        io.emit('updateTodos', todoList);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('server is listening on port 3000');
});


// const express = require('express');
// const app = express();
// const { join } = require('path');
// const http = require('http');
// const socketio = require('socket.io');
// const server = http.createServer(app);
// const io = socketio(server);

// app.get('/', (req, res) => {
//     res.sendFile(join(__dirname, 'index.html'));
// });

// let counter =0

// io.on('connection', (socket) => {
//     console.log('user connected');

//     socket.emit("currentvalue",counter)

//     socket.on("increment",()=>{
//         counter++;
//         io.emit("currentvalue",counter)
//     })

//     socket.on("disconnect",()=>{
//         console.log("disconnected user")
//     })
// });

// server.listen(3000, () => {
//     console.log('server is listening on 3000 buddy');
// });
