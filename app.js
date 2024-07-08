const express = require('express')
const http = require('http')
const socket = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socket(server)

app.set('view engine','ejs')
app.use(express.static('public'))
io.on('connection',(socket)=>{
    socket.on('newuser',(data)=>{
        socket.broadcast.emit('connecteduser',data);
    })
    let name;
    socket.on('userleft',(user)=>{
        io.sockets.emit('leftuser',user);
        name = user;
    })
    socket.on('message',(mes)=>{
        io.sockets.emit('receiveMessage',mes)
    })
    socket.on('disconnect',()=>{
        io.sockets.emit('leftuser',name);
    })
})
app.get('/',(req,res)=>{
    res.render('index')
})
server.listen(4000,()=>{
    console.log("Server is Running AT:4000");
})