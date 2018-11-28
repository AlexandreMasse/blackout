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

  io.sockets.on('connection', function response(socket) {
    socket.on('deviceType' , (data) => {
        console.log(`connected ${data.type} client`)
      })
  })
}

console.log('server is running on http://localhost:' + port);
