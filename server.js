const express=require("express");
const path=require("path");

// const app=express();
var app=express();
const server=require("http").createServer(app);

const io=require("socket.io")(server);

app.use(express.static(path.join(__dirname+"/public")));

io.on("connection", function(socket){
    socket.on("newuser",function(username){
        socket.broadcast.emit("update",username + " joined the conversation");
    });
    socket.on("exituser",function(username){
        socket.broadcast.emit("update",username + " left the conversation");
    });
    socket.on("chat",function(message){
        socket.broadcast.emit("chat",message);
    });
});

server.listen(5000);
// app.set('port', process.env.PORT || 3000);
// server.listen(5000, '192.168.0.3');
// app.listen(5000, "192.168.0.76");

// let PORT = process.env.PORT || 3000;
// app.listen(PORT, ()=>{
//     console.log(`Server Up And Running At Port ${PORT}`);
// });