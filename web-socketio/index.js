const express = require('express');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views','./views');


const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(port, function(){
    console.log('App listening on port :' + port);
})

let roomList = [];
let userList = [];
//Lang nghe xem co ai ket noi len khong
io.on('connection',function(socket){
    console.log('Someone just has been connected with id: ' + socket.id);
    console.log(socket.adapter.rooms);
    //Khi client gui mot emit len server, thi server can lang nghe cai emit do : socket.on
    socket.on('disconnect', function(){
        console.log(socket.id + ' are disconnected');
    });

    socket.on('client-create-room', function(data){
        console.log(socket.id + 'just send : ' + data);
        socket.join(data);
        socket.roomName = data;
        let rooms = [];
        for(r in socket.adapter.rooms){
            rooms.push(r);
        }
        io.sockets.emit('server-send-rooms', rooms);

    });
    socket.on('client-send-message', function(data){
        //emit ve nhung nguoi trong cung 1 room
        io.sockets.in(socket.roomName).emit('server-chat-in-room', data);
    })
   
});



app.get('/',function(req,res){
    res.render('index');
})
