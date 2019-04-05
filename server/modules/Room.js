import Password from './Password';
import Rooms from './Rooms';

export default class Room {
  constructor(socket) {
    this.userInRoom = 0;
    this.password = new Password();
    this.users = {}; // {desktop: null, player1: null, player2: null}
    this.getUserId(socket);
  }

  create(socket) {
    Rooms.roomIndex++;
    const randomIndex = Math.floor(Math.random() * Rooms.roomArr.length);
    var randomRoom = Rooms.roomArr[randomIndex];

    let roomId = `room-${randomRoom}`;
    socket.join(randomRoom);
    Rooms.activeRoom.push(randomRoom);
    Rooms.roomArrId.push(socket.id);
    this.users.desktop = socket.id;
    socket.room = roomId;
    this.password.createUsersPassword(roomId, socket);

    // remove id from avaible room
    if (randomIndex > -1) {
      Rooms.roomArr.splice(randomIndex, 1);
    }

    console.log(`The room with the id :${randomRoom} is created`);
  }

  destroy(io, socket) {
    socket.on('disconnect', () => {
      console.log('user disconnected');
      let roomId = socket.room;
      var ret = roomId.replace(/room-/g, '');
      Rooms.roomArr.push(ret);

      var index = Rooms.activeRoom.indexOf(ret);
      if (index > -1) {
        Rooms.activeRoom.splice(index, 1);
      }

      io.to(roomId).emit('userDisconnected', 'perte de la connection');
      io.of('/')
        .in(roomId)
        .clients((error, socketIds) => {
          if (error) throw error;
          socketIds.forEach(socketId =>
            io.sockets.sockets[socketId].leave(socket)
          );
        });
    });
  }

  currentStep = (io, socket) => {
    socket.on('currentStep', data => {
      io.to(socket.room).emit('currentStep', {
        step: data.step
      });
    });
  };

  userCurrentStep = (io, socket) => {
    socket.on('userCurrentStep', data => {
      io.to(this.users[data.userId].socketId).emit('currentStep', {
        step: data.step
      });
    });
  };

  showDanger = (io, socket) => {
    socket.on('showDanger', data => {
      io.to(this.users[data.userId].socketId).emit('showDanger', {
        showDanger: data.showDanger
      });
    });
  };

  getUserId(socket) {
    socket.on('tes', userID => {
      console.log('un nouvelle userID est la: ', userID);
    });
  }
}
