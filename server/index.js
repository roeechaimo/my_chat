var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var indexFile = path.join(__dirname, '../', 'index.html');

app.use(express.static(indexFile));

app.get('/', function(req, res) {
  res.sendFile(indexFile);
});

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg) {
    console.log('message: ' + msg);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
