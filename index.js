var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use('/',express.static('public'));

app.get('/', (req, res) => {
  res.sendFile( __dirname + '/index.html');
});


io.on('connection', (socket) => {

  //console.log('a user connected');  
  
  socket.on('chat message', (msg) => {
     console.log('chat message: ' + msg);
     socket.broadcast.emit('chat message', msg);
  });

  socket.on('mudar', (msg) => {
     console.log('mudar: ' + msg);
     io.emit('status', msg);
  });

  socket.on('notificacao', (msg) => {
     console.log('notificacao: ' + msg);
     io.emit('notificacao', msg);
  });

  socket.on('chat_disconnect2', (msg) => {
     console.log('chat_disconnect2: ' + msg);
     io.emit('chat_disconnect', msg);
  });


  socket.on('disconnect', () => {
    console.log('user disconnected');
    io.emit('disconnect', 'saiu');
  });

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});