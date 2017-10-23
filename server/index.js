var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var basePath = path.join(__dirname, '../');
var RandomColor = require('just.randomcolor');

app.use(express.static(basePath));

app.get('/', function(req, res) {
  res.sendFile(basePath);
});

io.on('connection', function(socket) {
  var color = new RandomColor().toHex();
  var msgObj = {'color': '', 'text': ''};
  console.log('a user connected.');
  socket.on('disconnect', function() {
    console.log('user disconnected.');
  });
  socket.on('chat message', function(msg) {
    msgObj.color = color.value;
    msgObj.text = msg;
    console.log('message: ' + msg);
    io.emit('chat message', JSON.stringify(msgObj));
  });
  socket.on('ring bell', function(fileLocation) {
    console.log(fileLocation);
    io.emit('ring bell', fileLocation);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
