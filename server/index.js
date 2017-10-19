var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var indexFile = path.join(__dirname, '../', 'index.html');

app.use(express.static(indexFile));

app.get('/', function(req, res) {
  res.sendFile(indexFile);
});


http.listen(3000, function() {
  console.log('listening on *:3000');
});
