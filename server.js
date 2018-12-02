const express = require('express');
const bodyParser = require('body-parser');
const _ = require('underscore')
const path = require('path');
const app = express();
const localStorage = require('localStorage')
const nodeCookie = require('node-cookie')
var server = require('http').createServer(app)
const isDeveloping = process.env.NODE_ENV !== 'production'
const port = isDeveloping ? 5000 : process.env.PORT
// const io = require('socket.io').listen(app.listen(port))
var io = require('socket.io')(server, { wsEngine: 'ws' })
app.set('port', process.env.PORT || 5000);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
server.listen(app.get('port'), function () {
  console.log('----- SERVER STARTED -----')
  if (isDeveloping) {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    })
    var roomIndex = 0
    var roomArr = []
    var passwordArr = []
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
      passwordArr.push(codePlayer)
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
          socket.join(roomName)
          socket.emit('connectToRoom', `Hello ${userId} you are in ${roomName}`)
          delete activeCodeObj[code]
        } else {
          console.log('mdp nom définit')
          socket.emit('connectToRoom', "Une erreur s'est produite")
        }
      })
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
            createUsersCode(roomName)
            console.log(`connected ${data.type} client in room ${roomIndex}`)
          }
          
          if (data.type === 'mobile') {
            checkUserCode(socket)
          }
        })
    })
  }
})


// console.log('server is running on http://localhost:' + port)
