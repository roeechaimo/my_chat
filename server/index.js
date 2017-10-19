var app = require('express')();
var http = require('http').Server(app);
var indexFile = __dirname + '/../index.html';

app.get('/', function(req, res) {
  console.log(indexFile);
  res.send(indexFile);
});


http.listen(3000, function() {
  console.log('listening on *:3000');
});
