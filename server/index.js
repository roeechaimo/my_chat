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
  console.log('a user connected. color value: ' + color.value);
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg) {
    msgObj.color = color.value;
    msgObj.text = msg;
    console.log('message: ' + msg);
    io.emit('chat message', JSON.stringify(msgObj));
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
