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
  var roomIndex = 0
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
  let createCode = function() {
    var codePlayer = getRandomCode(codeArr)
    var codePlayerIndex = codeArr.indexOf(codePlayer)
    codeArr.splice( codePlayerIndex, 1 )

    return {code: codePlayer}
  }

  let createUsersCode = function() {
    let player1 = createCode()
    let player2 = createCode()

    console.log(player1)
    console.log(player2)
  }

  generateCodeArr()
 

  io.sockets.on('connection', function response(socket) {

    // Check device type 
    socket.on('deviceType', (data) => {
        if (data.type === 'desktop') {
          roomIndex++
          var roomName = `room-${roomIndex}`
          socket.join(roomName)
          roomArr.push(roomName)
          // socket.rooms = roomName
          createUsersCode()
          console.log(`connected ${data.type} client in room ${roomIndex}`)
        }
        
        if (data.type === 'mobile') {
          let roomName = `room-${roomIndex}`
          console.log(roomName)
          console.log(io.nsps['/'].adapter.rooms[roomName])
          if(io.nsps['/'].adapter.rooms[roomName] && io.nsps['/'].adapter.rooms[roomName].length > 2) {
            console.log('la room est pleine')
            socket.emit('connectToRoom', "Une erreur s'est produite")
          } else {
            // Send this event to everyone in the room.
            socket.join(roomName)
            socket.emit('connectToRoom', "You are in room no. "+roomIndex)
          }
        }
      })
  })
}

console.log('server is running on http://localhost:' + port)
