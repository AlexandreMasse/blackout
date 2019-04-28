"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Password = _interopRequireDefault(require("./Password"));

var _Rooms = _interopRequireDefault(require("./Rooms"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var User =
/*#__PURE__*/
function () {
  function User() {
    var _this = this;

    _classCallCheck(this, User);

    _defineProperty(this, "connect", function (io, socket) {
      socket.on('password', function (data) {
        console.log('hello', data.key);
        var code = data.key;

        if (_Password.default.activePasswordObj[code]) {
          var roomNameData = _Password.default.activePasswordObj[code];
          var parts = roomNameData.split('_', 2);
          var roomId = parts[0];
          console.log('ROOM ID:', roomId);
          var userId = parts[1];

          _this.getRoomInstance();

          socket.username = userId;
          socket.room = roomId;
          socket.code = code;
          socket.join(roomId);
          io.to(roomId).emit('connectToRoom', {
            roomId: roomId,
            userId: userId,
            password: code
          });
          _this.roomInstance.users[userId] = {
            socketId: socket.id,
            phoneDataObject: _this.phoneDataObject
          };
          console.log('Instance de la room après connexion : ', _this.roomInstance);
          console.log("Nombre d'utilisateur : ", Object.keys(_this.roomInstance.users).length); // All clients connected to room

          if (Object.keys(_this.roomInstance.users).length === 3) {
            var phoneData = [];

            for (var user in _this.roomInstance.users) {
              var userInstance = _this.roomInstance.users[user];

              if (user === 'player1' || user === 'player2') {
                phoneData.push({
                  userId: user,
                  phoneData: userInstance.phoneDataObject
                });
              }
            }

            io.to(socket.room).emit('phoneData', phoneData);
          } // Emit phone data after connexion
          // io.to(socket.room).emit('phoneData', {
          //     phoneData: this.phoneDataObject,
          //     userId: socket.username
          // })


          delete _Password.default.activePasswordObj[code];
        } else {
          console.log('mdp nom définit -> emit passwordError');
          socket.emit('passwordError');
        }
      });
    });

    _defineProperty(this, "reconnect", function (io, socket) {
      socket.on('reco', function (data) {
        console.log('on sendCookie', data);
        socket.username = data.userId;
        socket.room = data.roomId;
        io.in(data.roomId).clients(function (err, clients) {
          console.log(clients);
          var size = Object.keys(clients).length;
          console.log(size);

          if (size > 1) {
            socket.join(data.roomId);
            io.to(data.roomId).emit('connectToRoom', {
              roomId: data.roomId,
              userId: data.userId
            }); // io.to(data.roomId).emit('connectToRoom', {
            //     roomId: data.roomId,
            //     userId: data.userId
            // })
          }
        });
      });
    });

    _defineProperty(this, "disconnect", function (io, socket) {
      socket.on('disconnect', function () {
        var code = socket.code; // console.log(code)

        _Password.default.activePasswordObj[code] = "".concat(socket.room, "_").concat(socket.username);

        _Password.default.passwordArr.push(code);

        io.to(socket.room).emit('disconnectToRoom', {
          roomId: socket.room,
          userId: socket.username
        });
        console.log("user ".concat(socket.username, " mobile disconnected"));
      });
    });

    _defineProperty(this, "phoneData", function (io, socket) {
      socket.on('phoneData', function (data) {
        _this.phoneDataObject = data.phoneData;
      });
    });

    _defineProperty(this, "showDanger", function (io, socket) {
      socket.on('showDanger', function (data) {
        io.to(_this.roomInstance.users[data.userId].socketId).emit('showDanger', {
          showDanger: data.showDanger
        });
      });
    });

    _defineProperty(this, "position", function (io, socket) {
      socket.on('position', function (data) {
        io.to(socket.room).emit('position', {
          position: data.position,
          userId: socket.username
        });
      });
    });

    _defineProperty(this, "lightOn", function (io, socket) {
      socket.on('isLightOn', function (data) {
        io.to(socket.room).emit('isLightOn', {
          isLightOn: data.isLightOn,
          userId: socket.username
        });
      });
    });

    _defineProperty(this, "slider", function (io, socket) {
      socket.on('sliderValue', function (data) {
        io.to(socket.room).emit('sliderValue', {
          sliderValue: data.sliderValue,
          userId: socket.username
        });
      });
    });

    _defineProperty(this, "tap", function (io, socket) {
      socket.on('tapValue', function (data) {
        io.to(socket.room).emit('tapValue', {
          tapValue: data.tapValue,
          userId: socket.username
        });
      });
    });

    _defineProperty(this, "introProgression", function (io, socket) {
      socket.on('introProgression', function (data) {
        io.to(socket.room).emit('introProgression', {
          progression: data.progression,
          userId: socket.username
        });
      });
    });

    _defineProperty(this, "fingerprint", function (io, socket) {
      socket.on('fingerprint', function () {
        io.to(socket.room).emit('fingerprint', {
          userId: socket.username
        });
      });
    });

    _defineProperty(this, "code", function (io, socket) {
      socket.on('code', function (data) {
        io.to(socket.room).emit('code', {
          code: data.code,
          userId: socket.username
        });
      });
    });

    _defineProperty(this, "handle", function (io, socket) {
      socket.on('handle', function (data) {
        io.to(socket.room).emit('handle', {
          handle: data.handle,
          userId: socket.username
        });
      });
    });

    this.phoneDataObject = {};
  }

  _createClass(User, [{
    key: "getRoomInstance",
    value: function getRoomInstance() {
      this.roomInstance = _Rooms.default.roomArrInstance[_Rooms.default.roomIndex - 1];
    }
  }, {
    key: "sendUserId",
    value: function sendUserId(io, userId, roomId) {
      var parts = roomId.split('-', 2);
      var roomIndex = parseInt(parts[1]);
      console.log('parts', roomIndex);
      console.log(_Rooms.default.roomArrId);
      var roomSocketId = _Rooms.default.roomArrId[roomIndex - 1];
      console.log('la room actuelle est :', roomId, 'et sa room socketID : ', roomSocketId); // socket.broadcast.to(roomSocketId).emit('bra', userId)

      io.to("".concat(roomSocketId)).emit('tes', 'I just met you');
    }
  }]);

  return User;
}();

exports.default = User;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL21vZHVsZXMvVXNlci5qcyJdLCJuYW1lcyI6WyJVc2VyIiwiaW8iLCJzb2NrZXQiLCJvbiIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwia2V5IiwiY29kZSIsInBhc3N3b3JkIiwiYWN0aXZlUGFzc3dvcmRPYmoiLCJyb29tTmFtZURhdGEiLCJwYXJ0cyIsInNwbGl0Iiwicm9vbUlkIiwidXNlcklkIiwiZ2V0Um9vbUluc3RhbmNlIiwidXNlcm5hbWUiLCJyb29tIiwiam9pbiIsInRvIiwiZW1pdCIsInJvb21JbnN0YW5jZSIsInVzZXJzIiwic29ja2V0SWQiLCJpZCIsInBob25lRGF0YU9iamVjdCIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJwaG9uZURhdGEiLCJ1c2VyIiwidXNlckluc3RhbmNlIiwicHVzaCIsImluIiwiY2xpZW50cyIsImVyciIsInNpemUiLCJwYXNzd29yZEFyciIsInNob3dEYW5nZXIiLCJwb3NpdGlvbiIsImlzTGlnaHRPbiIsInNsaWRlclZhbHVlIiwidGFwVmFsdWUiLCJwcm9ncmVzc2lvbiIsImhhbmRsZSIsIlJvb21zIiwicm9vbUFyckluc3RhbmNlIiwicm9vbUluZGV4IiwicGFyc2VJbnQiLCJyb29tQXJySWQiLCJyb29tU29ja2V0SWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7QUFDbkIsa0JBQWM7QUFBQTs7QUFBQTs7QUFBQSxxQ0FRSixVQUFDQyxFQUFELEVBQUtDLE1BQUwsRUFBZ0I7QUFDeEJBLE1BQUFBLE1BQU0sQ0FBQ0MsRUFBUCxDQUFVLFVBQVYsRUFBc0IsVUFBQUMsSUFBSSxFQUFJO0FBQzVCQyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxPQUFaLEVBQXFCRixJQUFJLENBQUNHLEdBQTFCO0FBQ0EsWUFBTUMsSUFBSSxHQUFHSixJQUFJLENBQUNHLEdBQWxCOztBQUNBLFlBQUlFLGtCQUFTQyxpQkFBVCxDQUEyQkYsSUFBM0IsQ0FB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Q0FBNUIsQ0FBbkI7QUFDQTNDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUNFLHdCQURGLEVBRUVRLE1BRkYsRUFHRSx3QkFIRixFQUlFcUMsWUFKRixFQU42QixDQVk3Qjs7QUFDQWxELE1BQUFBLEVBQUUsQ0FBQ21CLEVBQUgsV0FBUytCLFlBQVQsR0FBeUI5QixJQUF6QixDQUE4QixLQUE5QixFQUFxQyxnQkFBckM7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXNzd29yZCBmcm9tICcuL1Bhc3N3b3JkJztcbmltcG9ydCBSb29tcyBmcm9tICcuL1Jvb21zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucGhvbmVEYXRhT2JqZWN0ID0ge307XG4gIH1cblxuICBnZXRSb29tSW5zdGFuY2UoKSB7XG4gICAgdGhpcy5yb29tSW5zdGFuY2UgPSBSb29tcy5yb29tQXJySW5zdGFuY2VbUm9vbXMucm9vbUluZGV4IC0gMV07XG4gIH1cblxuICBjb25uZWN0ID0gKGlvLCBzb2NrZXQpID0+IHtcbiAgICBzb2NrZXQub24oJ3Bhc3N3b3JkJywgZGF0YSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnaGVsbG8nLCBkYXRhLmtleSk7XG4gICAgICBjb25zdCBjb2RlID0gZGF0YS5rZXk7XG4gICAgICBpZiAocGFzc3dvcmQuYWN0aXZlUGFzc3dvcmRPYmpbY29kZV0pIHtcbiAgICAgICAgY29uc3Qgcm9vbU5hbWVEYXRhID0gcGFzc3dvcmQuYWN0aXZlUGFzc3dvcmRPYmpbY29kZV07XG4gICAgICAgIGNvbnN0IHBhcnRzID0gcm9vbU5hbWVEYXRhLnNwbGl0KCdfJywgMik7XG4gICAgICAgIGNvbnN0IHJvb21JZCA9IHBhcnRzWzBdO1xuICAgICAgICBjb25zb2xlLmxvZygnUk9PTSBJRDonLHJvb21JZClcbiAgICAgICAgY29uc3QgdXNlcklkID0gcGFydHNbMV07XG4gICAgICAgIHRoaXMuZ2V0Um9vbUluc3RhbmNlKCk7XG4gICAgICAgIHNvY2tldC51c2VybmFtZSA9IHVzZXJJZDtcbiAgICAgICAgc29ja2V0LnJvb20gPSByb29tSWQ7XG4gICAgICAgIHNvY2tldC5jb2RlID0gY29kZTtcbiAgICAgICAgc29ja2V0LmpvaW4ocm9vbUlkKTtcbiAgICAgICAgaW8udG8ocm9vbUlkKS5lbWl0KCdjb25uZWN0VG9Sb29tJywge1xuICAgICAgICAgIHJvb21JZDogcm9vbUlkLFxuICAgICAgICAgIHVzZXJJZDogdXNlcklkLFxuICAgICAgICAgIHBhc3N3b3JkOiBjb2RlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucm9vbUluc3RhbmNlLnVzZXJzW3VzZXJJZF0gPSB7XG4gICAgICAgICAgc29ja2V0SWQ6IHNvY2tldC5pZCxcbiAgICAgICAgICBwaG9uZURhdGFPYmplY3Q6IHRoaXMucGhvbmVEYXRhT2JqZWN0XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgJ0luc3RhbmNlIGRlIGxhIHJvb20gYXByw6hzIGNvbm5leGlvbiA6ICcsXG4gICAgICAgICAgdGhpcy5yb29tSW5zdGFuY2VcbiAgICAgICAgKTtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgXCJOb21icmUgZCd1dGlsaXNhdGV1ciA6IFwiLFxuICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMucm9vbUluc3RhbmNlLnVzZXJzKS5sZW5ndGhcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBBbGwgY2xpZW50cyBjb25uZWN0ZWQgdG8gcm9vbVxuICAgICAgICBpZiAoT2JqZWN0LmtleXModGhpcy5yb29tSW5zdGFuY2UudXNlcnMpLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgIGNvbnN0IHBob25lRGF0YSA9IFtdO1xuICAgICAgICAgIGZvciAoY29uc3QgdXNlciBpbiB0aGlzLnJvb21JbnN0YW5jZS51c2Vycykge1xuICAgICAgICAgICAgY29uc3QgdXNlckluc3RhbmNlID0gdGhpcy5yb29tSW5zdGFuY2UudXNlcnNbdXNlcl07XG4gICAgICAgICAgICBpZiAodXNlciA9PT0gJ3BsYXllcjEnIHx8IHVzZXIgPT09ICdwbGF5ZXIyJykge1xuICAgICAgICAgICAgICBwaG9uZURhdGEucHVzaCh7XG4gICAgICAgICAgICAgICAgdXNlcklkOiB1c2VyLFxuICAgICAgICAgICAgICAgIHBob25lRGF0YTogdXNlckluc3RhbmNlLnBob25lRGF0YU9iamVjdFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpby50byhzb2NrZXQucm9vbSkuZW1pdCgncGhvbmVEYXRhJywgcGhvbmVEYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEVtaXQgcGhvbmUgZGF0YSBhZnRlciBjb25uZXhpb25cbiAgICAgICAgLy8gaW8udG8oc29ja2V0LnJvb20pLmVtaXQoJ3Bob25lRGF0YScsIHtcbiAgICAgICAgLy8gICAgIHBob25lRGF0YTogdGhpcy5waG9uZURhdGFPYmplY3QsXG4gICAgICAgIC8vICAgICB1c2VySWQ6IHNvY2tldC51c2VybmFtZVxuICAgICAgICAvLyB9KVxuICAgICAgICBkZWxldGUgcGFzc3dvcmQuYWN0aXZlUGFzc3dvcmRPYmpbY29kZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygnbWRwIG5vbSBkw6lmaW5pdCAtPiBlbWl0IHBhc3N3b3JkRXJyb3InKTtcbiAgICAgICAgc29ja2V0LmVtaXQoJ3Bhc3N3b3JkRXJyb3InKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICByZWNvbm5lY3QgPSAoaW8sIHNvY2tldCkgPT4ge1xuICAgIHNvY2tldC5vbigncmVjbycsIGRhdGEgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ29uIHNlbmRDb29raWUnLCBkYXRhKTtcbiAgICAgIHNvY2tldC51c2VybmFtZSA9IGRhdGEudXNlcklkO1xuICAgICAgc29ja2V0LnJvb20gPSBkYXRhLnJvb21JZDtcblxuICAgICAgaW8uaW4oZGF0YS5yb29tSWQpLmNsaWVudHMoKGVyciwgY2xpZW50cykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhjbGllbnRzKTtcbiAgICAgICAgdmFyIHNpemUgPSBPYmplY3Qua2V5cyhjbGllbnRzKS5sZW5ndGg7XG4gICAgICAgIGNvbnNvbGUubG9nKHNpemUpO1xuICAgICAgICBpZiAoc2l6ZSA+IDEpIHtcbiAgICAgICAgICBzb2NrZXQuam9pbihkYXRhLnJvb21JZCk7XG4gICAgICAgICAgaW8udG8oZGF0YS5yb29tSWQpLmVtaXQoJ2Nvbm5lY3RUb1Jvb20nLCB7XG4gICAgICAgICAgICByb29tSWQ6IGRhdGEucm9vbUlkLFxuICAgICAgICAgICAgdXNlcklkOiBkYXRhLnVzZXJJZFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIGlvLnRvKGRhdGEucm9vbUlkKS5lbWl0KCdjb25uZWN0VG9Sb29tJywge1xuICAgICAgICAgIC8vICAgICByb29tSWQ6IGRhdGEucm9vbUlkLFxuICAgICAgICAgIC8vICAgICB1c2VySWQ6IGRhdGEudXNlcklkXG4gICAgICAgICAgLy8gfSlcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgZGlzY29ubmVjdCA9IChpbywgc29ja2V0KSA9PiB7XG4gICAgc29ja2V0Lm9uKCdkaXNjb25uZWN0JywgKCkgPT4ge1xuICAgICAgbGV0IGNvZGUgPSBzb2NrZXQuY29kZTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGNvZGUpXG4gICAgICBwYXNzd29yZC5hY3RpdmVQYXNzd29yZE9ialtjb2RlXSA9IGAke3NvY2tldC5yb29tfV8ke3NvY2tldC51c2VybmFtZX1gO1xuICAgICAgcGFzc3dvcmQucGFzc3dvcmRBcnIucHVzaChjb2RlKTtcbiAgICAgIGlvLnRvKHNvY2tldC5yb29tKS5lbWl0KCdkaXNjb25uZWN0VG9Sb29tJywge1xuICAgICAgICByb29tSWQ6IHNvY2tldC5yb29tLFxuICAgICAgICB1c2VySWQ6IHNvY2tldC51c2VybmFtZVxuICAgICAgfSk7XG4gICAgICBjb25zb2xlLmxvZyhgdXNlciAke3NvY2tldC51c2VybmFtZX0gbW9iaWxlIGRpc2Nvbm5lY3RlZGApO1xuICAgIH0pO1xuICB9O1xuXG4gIHBob25lRGF0YSA9IChpbywgc29ja2V0KSA9PiB7XG4gICAgc29ja2V0Lm9uKCdwaG9uZURhdGEnLCBkYXRhID0+IHtcbiAgICAgIHRoaXMucGhvbmVEYXRhT2JqZWN0ID0gZGF0YS5waG9uZURhdGE7XG4gICAgfSk7XG4gIH07XG5cbiAgc2hvd0RhbmdlciA9IChpbywgc29ja2V0KSA9PiB7XG4gICAgc29ja2V0Lm9uKCdzaG93RGFuZ2VyJywgZGF0YSA9PiB7XG4gICAgICBpby50byh0aGlzLnJvb21JbnN0YW5jZS51c2Vyc1tkYXRhLnVzZXJJZF0uc29ja2V0SWQpLmVtaXQoJ3Nob3dEYW5nZXInLCB7XG4gICAgICAgIHNob3dEYW5nZXI6IGRhdGEuc2hvd0RhbmdlclxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcG9zaXRpb24gPSAoaW8sIHNvY2tldCkgPT4ge1xuICAgIHNvY2tldC5vbigncG9zaXRpb24nLCBkYXRhID0+IHtcbiAgICAgIGlvLnRvKHNvY2tldC5yb29tKS5lbWl0KCdwb3NpdGlvbicsIHtcbiAgICAgICAgcG9zaXRpb246IGRhdGEucG9zaXRpb24sXG4gICAgICAgIHVzZXJJZDogc29ja2V0LnVzZXJuYW1lXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBsaWdodE9uID0gKGlvLCBzb2NrZXQpID0+IHtcbiAgICBzb2NrZXQub24oJ2lzTGlnaHRPbicsIGRhdGEgPT4ge1xuICAgICAgaW8udG8oc29ja2V0LnJvb20pLmVtaXQoJ2lzTGlnaHRPbicsIHtcbiAgICAgICAgaXNMaWdodE9uOiBkYXRhLmlzTGlnaHRPbixcbiAgICAgICAgdXNlcklkOiBzb2NrZXQudXNlcm5hbWVcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHNsaWRlciA9IChpbywgc29ja2V0KSA9PiB7XG4gICAgc29ja2V0Lm9uKCdzbGlkZXJWYWx1ZScsIGRhdGEgPT4ge1xuICAgICAgaW8udG8oc29ja2V0LnJvb20pLmVtaXQoJ3NsaWRlclZhbHVlJywge1xuICAgICAgICBzbGlkZXJWYWx1ZTogZGF0YS5zbGlkZXJWYWx1ZSxcbiAgICAgICAgdXNlcklkOiBzb2NrZXQudXNlcm5hbWVcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHRhcCA9IChpbywgc29ja2V0KSA9PiB7XG4gICAgc29ja2V0Lm9uKCd0YXBWYWx1ZScsIGRhdGEgPT4ge1xuICAgICAgaW8udG8oc29ja2V0LnJvb20pLmVtaXQoJ3RhcFZhbHVlJywge1xuICAgICAgICB0YXBWYWx1ZTogZGF0YS50YXBWYWx1ZSxcbiAgICAgICAgdXNlcklkOiBzb2NrZXQudXNlcm5hbWVcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGludHJvUHJvZ3Jlc3Npb24gPSAoaW8sIHNvY2tldCkgPT4ge1xuICAgIHNvY2tldC5vbignaW50cm9Qcm9ncmVzc2lvbicsIGRhdGEgPT4ge1xuICAgICAgaW8udG8oc29ja2V0LnJvb20pLmVtaXQoJ2ludHJvUHJvZ3Jlc3Npb24nLCB7XG4gICAgICAgIHByb2dyZXNzaW9uOiBkYXRhLnByb2dyZXNzaW9uLFxuICAgICAgICB1c2VySWQ6IHNvY2tldC51c2VybmFtZVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgZmluZ2VycHJpbnQgPSAoaW8sIHNvY2tldCkgPT4ge1xuICAgIHNvY2tldC5vbignZmluZ2VycHJpbnQnLCAoKSA9PiB7XG4gICAgICBpby50byhzb2NrZXQucm9vbSkuZW1pdCgnZmluZ2VycHJpbnQnLCB7XG4gICAgICAgIHVzZXJJZDogc29ja2V0LnVzZXJuYW1lXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBjb2RlID0gKGlvLCBzb2NrZXQpID0+IHtcbiAgICBzb2NrZXQub24oJ2NvZGUnLCBkYXRhID0+IHtcbiAgICAgIGlvLnRvKHNvY2tldC5yb29tKS5lbWl0KCdjb2RlJywge1xuICAgICAgICBjb2RlOiBkYXRhLmNvZGUsXG4gICAgICAgIHVzZXJJZDogc29ja2V0LnVzZXJuYW1lXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBoYW5kbGUgPSAoaW8sIHNvY2tldCkgPT4ge1xuICAgIHNvY2tldC5vbignaGFuZGxlJywgZGF0YSA9PiB7XG4gICAgICBpby50byhzb2NrZXQucm9vbSkuZW1pdCgnaGFuZGxlJywge1xuICAgICAgICBoYW5kbGU6IGRhdGEuaGFuZGxlLFxuICAgICAgICB1c2VySWQ6IHNvY2tldC51c2VybmFtZVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgc2VuZFVzZXJJZChpbywgdXNlcklkLCByb29tSWQpIHtcbiAgICBjb25zdCBwYXJ0cyA9IHJvb21JZC5zcGxpdCgnLScsIDIpO1xuICAgIGNvbnN0IHJvb21JbmRleCA9IHBhcnNlSW50KHBhcnRzWzFdKTtcbiAgICBjb25zb2xlLmxvZygncGFydHMnLCByb29tSW5kZXgpO1xuICAgIGNvbnNvbGUubG9nKFJvb21zLnJvb21BcnJJZCk7XG4gICAgbGV0IHJvb21Tb2NrZXRJZCA9IFJvb21zLnJvb21BcnJJZFtyb29tSW5kZXggLSAxXTtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgICdsYSByb29tIGFjdHVlbGxlIGVzdCA6JyxcbiAgICAgIHJvb21JZCxcbiAgICAgICdldCBzYSByb29tIHNvY2tldElEIDogJyxcbiAgICAgIHJvb21Tb2NrZXRJZFxuICAgICk7XG4gICAgLy8gc29ja2V0LmJyb2FkY2FzdC50byhyb29tU29ja2V0SWQpLmVtaXQoJ2JyYScsIHVzZXJJZClcbiAgICBpby50byhgJHtyb29tU29ja2V0SWR9YCkuZW1pdCgndGVzJywgJ0kganVzdCBtZXQgeW91Jyk7XG4gIH1cbn1cbiJdfQ==