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

  let generateCodeArr = function() {
    var minCode = 1000
    var maxCode = 9999
    for (var i = minCode; i <= maxCode; i++) {
      codeArr.push(i)
    }
  }
  let getRandomCode = function(arr) {
    return arr[Math.floor(Math.random()*arr.length)]
  }
  generateCodeArr()
  var code = getRandomCode(codeArr)
  var codeIndex = codeArr.indexOf(code)
  
  let createUserCode = function() {
    
  }
  console.log(code)
  console.log(codeIndex)

  io.sockets.on('connection', function response(socket) {

    // Check device type 
    socket.on('deviceType', (data) => {
        if (data.type === 'desktop') {
          var roomName = `room-${roomIndex}`
          socket.join(roomName)
          console.log(`connected ${data.type} client in room ${roomIndex}`)
          roomArr.push(roomName)
          // socket.rooms = roomArr
          roomIndex++
        }
        
        if (data.type === 'mobile') {
          console.log('hui hui')
          console.log("room-"+roomIndex)
          
          // check user connected in room 
          if(io.nsps['/'].adapter.rooms["room-"+roomIndex] && io.nsps['/'].adapter.rooms["room-"+roomIndex].length > 1) {
            console.log('la room est pleine')
            io.sockets.in("room-"+roomIndex).emit('connectToRoom', "Une erreur s'est produite")
          } else {
            // Send this event to everyone in the room.
            socket.join("room-"+roomIndex)
            io.sockets.in("room-"+roomIndex).emit('connectToRoom', "You are in room no. "+roomIndex);
          }
        }
      })
  })
}

console.log('server is running on http://localhost:' + port);
