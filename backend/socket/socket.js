const { Server } = require("socket.io");
const express = require("express")
const http = require("http");
const app = express();
const dotenv = require("dotenv");
dotenv.config({});

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.URL,
        methods: ['GET', 'POST']
    }
})

const userSocketMap = {}; // this map stores socket id corresponding the user id; userId -> socketId

const getReceiverSocketId = (receiverId)=> userSocketMap[receiverId];

io.on('connection',(socket)=>{
    const userId = socket.handshake.query.userId;

    if(userId){
        userSocketMap[userId] = socket.id;
        console.log(`User connected : UserId = ${userId} , SocketId = ${socket.id}`)
    }

    io.emit('getOnlineUsers',Object.keys(userSocketMap));

    socket.on('disconnect' , ()=>{
        if(userId){
            console.log(`User Disconnected : UserId = ${userId} , SocketId = ${socket.id}`)
            delete userSocketMap[userId];
        }
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    })
})

module.exports = {app,server,io,getReceiverSocketId};