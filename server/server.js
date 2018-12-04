const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
var server = require('http').createServer(app)
import Room from './modules/Room'
import Password from './modules/Password'
// const io = require('socket.io').listen(app.listen(port))
var io = require('socket.io')(server, { wsEngine: 'ws' })
app.set('port', process.env.PORT || 8888);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  })
}

server.listen(app.get('port'), function () {
  console.log('----- SERVER STARTED -----')
    let password = new Password()
    // console.log(password)

    var roomIndex = 0
    var roomArr = []
    var codeArr = []
    var activeCodeObj = {}
  
    let generateCodeArr = function() {
      var minCode = 1000
      var maxCode = 9999
      for (var i = minCode; i <= maxCode; i++) {
        codeArr.push(i)
      }
    }
  

    let createCode = function() {
      var code = codeArr.splice(Math.floor(codeArr.length*Math.random()), 1);
      return code.length ? code[0] : null;
    }
  
    let createUsersCode = function(roomName, socket) {
      let player1 = createCode()
      let player2 = createCode()
      activeCodeObj[ player1 ] = `${roomName}_player1`
      activeCodeObj[ player2 ] = `${roomName}_player2`

      socket.emit('setCode', { 
        code1: player1,
        code2: player2,
        roomId: roomName
      })
      
      // socket.emit('createRoom', { 
      //   code1: player1,
      //   code2: player2,
      //   roomId: roomName
      // })

      console.log(activeCodeObj)
    }

    let checkUserCode = (socket) => {
      socket.on('sendCode', (data) => {
        console.log('hello', data.key)
        let code = data.key
        if(activeCodeObj[code]) {
          console.log(activeCodeObj[code])
          let roomNameData = activeCodeObj[code]
          var parts = roomNameData.split('_', 2)
          let roomName = parts[0]
          let userId = parts[1]
          socket.username = userId
          socket.room = roomName
          socket.code = code
          socket.join(roomName)
          socket.room = roomName
          // socket.emit('connectToRoom', `Hello ${userId} you are in ${roomName}`)
          io.to(roomName).emit('connectToRoom',{
            room: roomName,
            userId: userId
          })
          delete activeCodeObj[code]
        } else {
          console.log('mdp nom définit')
          socket.emit('connectToRoom', "Une erreur s'est produite")
        }
      })
    }
    // let getUserConnected = (socket) => {
    //   socket.emit('connectToRoom', `Hello ${userId}`)
    // }

    let userDisconnected = (socket) => {
      socket.on('disconnect', function () {
        // console.log(socket.username)
        // console.log(socket.room)
        // console.log(socket.code)
        let code = socket.code 
        codeArr.push(code)
        io.to(socket.room).emit('disconnectToRoom', {
          room: socket.room,
          userId: socket.username
        })
        console.log('user mobile disconnected')
      })
    }

    generateCodeArr()
   
    let room = new Room()
    room.init()
    io.sockets.on('connection', function response(socket) {

      // Check device type 
      socket.on('deviceType', (data) => {
          if (data.type === 'desktop') {
            room.create(socket)
            room.destroy(io ,socket)
            // disconnection
            // socket.on('disconnect', function () {
            //   // console.log(socket)
            //   console.log('user disconnected')
            //   let roomName = socket.room
            //   console.log(roomName)
            //   var index = roomArr.indexOf(roomName)
            //   if (index > -1) {
            //     roomArr.splice(index, 1)
            //   }
            //   console.log(roomArr)
            //   // var clients = io.sockets.clients('room'); // all users from room `room`
            //   // var usersInRoom = io.of('/').in(socket.room).clients
            //   // console.log(usersInRoom)
            //   io.to(socket.room).emit('userDisconnected',
            //     'perte de la connection'
            //    // users: usersInRoom
            //   )
            // })
          }
          
          if (data.type === 'mobile') {
            checkUserCode(socket)
            userDisconnected(socket)
          }
        })
    })
  // }
})
// console.log('server is running on http://localhost:' + port)
