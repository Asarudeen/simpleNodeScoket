var express = require("express");
var app = express();
var path = require('path');
//var http = require('http').Server(app);
var port = 3700;

var io = require('socket.io').listen(app.listen(port));
 
/*app.get("/", function(req, res){
    res.send("It works!");
});*/

app.set('views', __dirname + '/views');
app.use("/includes", express.static(__dirname + "/includes"));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/client.html'));
});

app.get('/admin', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/admin.html'));
});
 
//http.listen(port);

io.sockets.on('connection', function (socket) {
    //socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('score', data);
    });
});

console.log("Server Started");