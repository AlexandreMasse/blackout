const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const isDeveloping = process.env.NODE_ENV !== 'production'
const port = isDeveloping ? 5000 : process.env.PORT
const io = require('socket.io').listen(app.listen(port))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if (isDeveloping) {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
  var roomIndex = 1
  var roomArr = []
  var codeArr = []

  let generateCode = function() {
    var minCode = 1000
    var maxCode = 9999
    for (var i = minCode; i <= maxCode; i++) {
      codeArr.push(i)
    }
  }
  generateCode()

  io.sockets.on('connection', function response(socket) {

    // Check device type 
    socket.on('deviceType' , (data) => {
        if (data.type === 'desktop') {
          var roomName = `room-${roomIndex}`
          socket.join(roomName)
          console.log(`connected ${data.type} client in room ${roomIndex}`)
          roomArr.push(roomName)
          socket.rooms = roomArr
          roomIndex++
          console.log(socket.rooms)
          // if(io.nsps['/'].adapter.rooms["room-"+roomIndex] && io.nsps['/'].adapter.rooms["room-"+roomIndex].length > 1) roomIndex++;
          // socket.join("room-"+roomIndex);
        }
        
        if (data.type === 'mobile') {
          // Send this event to everyone in the room.
          io.sockets.in("room-"+roomIndex).emit('connectToRoom', "You are in room no. "+roomIndex);
        }
      })
  })
}

console.log('server is running on http://localhost:' + port);
