var express = require('express');
var app = express();

//socket.io
var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', function(socket){ 
  console.log("We have a new client: " + socket.id);  
  socket.on('message', 
      function (data) {
       console.log("message: " + data);
        // io.sockets.emit('message', "this goes to everyone");
      }
    );
});
server.listen(3006);


app.use('/', express.static('public'));
app.get('/', function (req, res) {
  res.send('Hello World!'); 
});

// app.get('/on', function (req, res) {
//   sendMessage(23, 1);
// });

// app.get('/off', function (req, res) {
//   sendMessage(23, 0);
// });


function doGet(request, response){
    console.log(request.query.id);
    console.log(request.query.msg);
    if( request.query.id == "37" || request.query.id == "38" || request.query.id == "39"){
      // sendMessage(37, request.query.msg);
      var newMsg = request.query.id + "," + request.query.msg;
      io.emit('message', newMsg);
    }

    response.send("thanks for the get");
}

app.get("/h",doGet);


app.listen(7999, function () {
  console.log('listening on port 7999!');
});


function sendMessage(id, val){
   var msgs = id + "," + val + "#";
   // myPort.write(msgs);
    console.log(msgs);
}

function showPortOpen() {
   console.log('port open. Data rate: ' + myPort.options.baudRate);
}
 
function sendSerialData(data) {
   console.log(data);
}
 
function showPortClose() {
   console.log('port closed.');
}
 
function showError(error) {
   console.log('Serial port error: ' + error);
}