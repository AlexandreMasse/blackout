const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
var server = require('http').createServer(app)
import Room from './modules/Room'
import User from './modules/User'
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
  let room = new Room()
  let user = new User()
  room.init()
  io.sockets.on('connection', function response(socket) {
    // Check device type 
    socket.on('deviceType', (data) => {
        if (data.type === 'desktop') {
          // room create
          room.create(socket)
          
          // destroy room
          room.destroy(io ,socket)
        }
        
        if (data.type === 'mobile') {
          // user connection
          user.connect(io, socket)
          
          // user disconnect
          user.disconnect(io, socket)
        }
    })
  })
})
