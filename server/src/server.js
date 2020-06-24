const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect(`${process.env.MONGO_CONN}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connectedUsers = {};

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;
    
    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(process.env.PORT, () => {
    console.log('app listening on port ' + process.env.PORT);
});