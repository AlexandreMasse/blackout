const express = require('express');
const bodyParser = require('body-parser');
const _ = require('underscore')
const path = require('path');
const app = express();
const localStorage = require('localStorage')
const nodeCookie = require('node-cookie')
var server = require('http').createServer(app)
// const io = require('socket.io').listen(app.listen(port))
var io = require('socket.io')(server, { wsEngine: 'ws' })
app.set('port', process.env.PORT || 80);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
server.listen(app.get('port'), function () {
  console.log('----- SERVER STARTED -----')
  // if (isDeveloping) {
    if (process.env.NODE_ENV === 'production') {
      // Serve any static files
      app.use(express.static(path.join(__dirname, 'client/build')));
      // Handle React routing, return all requests to React app
      app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
      })
    }
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    })
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
  
    let getRandomCode = function(arr) {
      return arr[Math.floor(Math.random()*arr.length)]
    }
  
    let createCode = function() {
      var codePlayer = getRandomCode(codeArr)
      var codePlayerIndex = codeArr.indexOf(codePlayer)
      codeArr.splice( codePlayerIndex, 1 )
      return codePlayer
    }
  
    let createUsersCode = function(roomName) {
      let player1 = createCode()
      let player2 = createCode()
      activeCodeObj[ player1 ] = `${roomName}_player1`
      activeCodeObj[ player2 ] = `${roomName}_player2`
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
          localStorage.setItem('room', roomName)
          socket.username = userId
          socket.join(roomName)
          socket.rooms = roomName
          socket.emit('connectToRoom', `Hello ${userId} you are in ${roomName}`)
          delete activeCodeObj[code]
        } else {
          console.log('mdp nom définit')
          socket.emit('connectToRoom', "Une erreur s'est produite")
        }
      })
    }

    let userDisconnected = (socket) => {
      socket.on('disconnect', function () {
        console.log(socket.username)
        console.log(socket.rooms)
        console.log('user disconnected')
      })
    }

    generateCodeArr()
   
    io.sockets.on('connection', function response(socket) {
      // Check device type 
      var cookie=socket.handshake.headers['cookie']
      // console.log(cookie)
      socket.on('deviceType', (data) => {
          if (data.type === 'desktop') {
            roomIndex++ 
            var roomName = `room-${roomIndex}`
            socket.join(roomName)
            roomArr.push(roomName)
            // socket.rooms = roomName
            createUsersCode(roomName)
            console.log(`connected ${data.type} client in room ${roomIndex}`)

            // disconnection
            socket.on('disconnect', function () {
              console.log(socket)
              console.log('user disconnected')
              console.log(roomName)
              var index = roomArr.indexOf(roomName)
              if (index > -1) {
                roomArr.splice(index, 1)
              }
              console.log(roomArr)
              // var clients = io.sockets.clients('room'); // all users from room `room`
              var usersInRoom = io.of('/').in(roomName).clients;
              console.log(usersInRoom)
              socket.emit('userDisconnected', usersInRoom)
              // usersInRoom.forEach(user => {
              //   user.leave(roomName)
              // })
              console.log(usersInRoom)
              // console.log(io.nsps['/'].adapter.rooms[roomName].length)
              // io.emit('user disconnected')
            })
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
