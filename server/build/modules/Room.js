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

var Room =
/*#__PURE__*/
function () {
  function Room(_socket) {
    var _this = this;

    _classCallCheck(this, Room);

    _defineProperty(this, "currentStep", function (io, socket) {
      socket.on('currentStep', function (data) {
        io.to(socket.room).emit('currentStep', {
          step: data.step
        });
      });
    });

    _defineProperty(this, "userCurrentStep", function (io, socket) {
      socket.on('userCurrentStep', function (data) {
        io.to(_this.users[data.userId].socketId).emit('currentStep', {
          step: data.step
        });
      });
    });

    _defineProperty(this, "showDanger", function (io, socket) {
      socket.on('showDanger', function (data) {
        io.to(_this.users[data.userId].socketId).emit('showDanger', {
          showDanger: data.showDanger
        });
      });
    });

    this.userInRoom = 0;
    this.password = new _Password.default();
    this.users = {}; // {desktop: null, player1: null, player2: null}

    this.getUserId(_socket);
  }

  _createClass(Room, [{
    key: "create",
    value: function create(socket) {
      _Rooms.default.roomIndex++;
      var randomIndex = Math.floor(Math.random() * _Rooms.default.roomArr.length);
      var randomRoom = _Rooms.default.roomArr[randomIndex];
      var roomId = "room-".concat(randomRoom);
      socket.join(roomId);

      _Rooms.default.activeRoom.push(randomRoom);

      _Rooms.default.roomArrId.push(socket.id);

      this.users.desktop = socket.id;
      socket.room = roomId;
      this.password.createUsersPassword(roomId, socket); // remove id from avaible room

      if (randomIndex > -1) {
        _Rooms.default.roomArr.splice(randomIndex, 1);
      }

      console.log("The room with the id :".concat(randomRoom, " is created"));
    }
  }, {
    key: "destroy",
    value: function destroy(io, socket) {
      socket.on('disconnect', function () {
        console.log('user disconnected');
        var roomId = socket.room;
        var ret = roomId.replace(/room-/g, '');

        _Rooms.default.roomArr.push(ret);

        var index = _Rooms.default.activeRoom.indexOf(ret);

        if (index > -1) {
          _Rooms.default.activeRoom.splice(index, 1);
        }

        io.to(roomId).emit('userDisconnected', 'perte de la connection');
        io.of('/').in(roomId).clients(function (error, socketIds) {
          if (error) throw error;
          socketIds.forEach(function (socketId) {
            return io.sockets.sockets[socketId].leave(socket);
          });
        });
      });
    }
  }, {
    key: "getUserId",
    value: function getUserId(socket) {
      socket.on('tes', function (userID) {
        console.log('un nouvelle userID est la: ', userID);
      });
    }
  }]);

  return Room;
}();

exports.default = Room;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL21vZHVsZXMvUm9vbS5qcyJdLCJuYW1lcyI6WyJSb29tIiwic29ja2V0IiwiaW8iLCJvbiIsImRhdGEiLCJ0byIsInJvb20iLCJlbWl0Iiwic3RlcCIsInVzZXJzIiwidXNlcklkIiwic29ja2V0SWQiLCJzaG93RGFuZ2VyIiwidXNlckluUm9vbSIsInBhc3N3b3JkIiwiUGFzc3dvcmQiLCJnZXRVc2VySWQiLCJSb29tcyIsInJvb21JbmRleCIsInJhbmRvbUluZGV4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicm9vbUFyciIsImxlbmd0aCIsInJhbmRvbVJvb20iLCJyb29tSWQiLCJqb2luIiwiYWN0aXZlUm9vbSIsInB1c2giLCJyb29tQXJySWQiLCJpZCIsImRlc2t0b3AiLCJjcmVhdGVVc2Vyc1Bhc3N3b3JkIiwic3BsaWNlIiwiY29uc29sZSIsImxvZyIsInJldCIsInJlcGxhY2UiLCJpbmRleCIsImluZGV4T2YiLCJvZiIsImluIiwiY2xpZW50cyIsImVycm9yIiwic29ja2V0SWRzIiwiZm9yRWFjaCIsInNvY2tldHMiLCJsZWF2ZSIsInVzZXJJRCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEk7OztBQUNuQixnQkFBWUMsT0FBWixFQUFvQjtBQUFBOztBQUFBOztBQUFBLHlDQW9ETixVQUFDQyxFQUFELEVBQUtELE1BQUwsRUFBZ0I7QUFDNUJBLE1BQUFBLE1BQU0sQ0FBQ0UsRUFBUCxDQUFVLGFBQVYsRUFBeUIsVUFBQUMsSUFBSSxFQUFJO0FBQy9CRixRQUFBQSxFQUFFLENBQUNHLEVBQUgsQ0FBTUosTUFBTSxDQUFDSyxJQUFiLEVBQW1CQyxJQUFuQixDQUF3QixhQUF4QixFQUF1QztBQUNyQ0MsVUFBQUEsSUFBSSxFQUFFSixJQUFJLENBQUNJO0FBRDBCLFNBQXZDO0FBR0QsT0FKRDtBQUtELEtBMURtQjs7QUFBQSw2Q0E0REYsVUFBQ04sRUFBRCxFQUFLRCxNQUFMLEVBQWdCO0FB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Q0csRUFBSCxDQUFNcUIsTUFBTixFQUFjbkIsSUFBZCxDQUFtQixrQkFBbkIsRUFBdUMsd0JBQXZDO0FBQ0FMLFFBQUFBLEVBQUUsQ0FBQ3VDLEVBQUgsQ0FBTSxHQUFOLEVBQ0dDLEVBREgsQ0FDTWhCLE1BRE4sRUFFR2lCLE9BRkgsQ0FFVyxVQUFDQyxLQUFELEVBQVFDLFNBQVIsRUFBc0I7QUFDN0IsY0FBSUQsS0FBSixFQUFXLE1BQU1BLEtBQU47QUFDWEMsVUFBQUEsU0FBUyxDQUFDQyxPQUFWLENBQWtCLFVBQUFuQyxRQUFRO0FBQUEsbUJBQ3hCVCxFQUFFLENBQUM2QyxPQUFILENBQVdBLE9BQVgsQ0FBbUJwQyxRQUFuQixFQUE2QnFDLEtBQTdCLENBQW1DL0MsTUFBbkMsQ0FEd0I7QUFBQSxXQUExQjtBQUdELFNBUEg7QUFRRCxPQXBCRDtBQXFCRDs7OzhCQTBCU0EsTSxFQUFRO0FBQ2hCQSxNQUFBQSxNQUFNLENBQUNFLEVBQVAsQ0FBVSxLQUFWLEVBQWlCLFVBQUE4QyxNQUFNLEVBQUk7QUFDekJkLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDZCQUFaLEVBQTJDYSxNQUEzQztBQUNELE9BRkQ7QUFHRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXNzd29yZCBmcm9tICcuL1Bhc3N3b3JkJztcbmltcG9ydCBSb29tcyBmcm9tICcuL1Jvb21zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9vbSB7XG4gIGNvbnN0cnVjdG9yKHNvY2tldCkge1xuICAgIHRoaXMudXNlckluUm9vbSA9IDA7XG4gICAgdGhpcy5wYXNzd29yZCA9IG5ldyBQYXNzd29yZCgpO1xuICAgIHRoaXMudXNlcnMgPSB7fTsgLy8ge2Rlc2t0b3A6IG51bGwsIHBsYXllcjE6IG51bGwsIHBsYXllcjI6IG51bGx9XG4gICAgdGhpcy5nZXRVc2VySWQoc29ja2V0KTtcbiAgfVxuXG4gIGNyZWF0ZShzb2NrZXQpIHtcbiAgICBSb29tcy5yb29tSW5kZXgrKztcbiAgICBjb25zdCByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIFJvb21zLnJvb21BcnIubGVuZ3RoKTtcbiAgICB2YXIgcmFuZG9tUm9vbSA9IFJvb21zLnJvb21BcnJbcmFuZG9tSW5kZXhdO1xuXG4gICAgbGV0IHJvb21JZCA9IGByb29tLSR7cmFuZG9tUm9vbX1gO1xuICAgIHNvY2tldC5qb2luKHJvb21JZCk7XG4gICAgUm9vbXMuYWN0aXZlUm9vbS5wdXNoKHJhbmRvbVJvb20pO1xuICAgIFJvb21zLnJvb21BcnJJZC5wdXNoKHNvY2tldC5pZCk7XG4gICAgdGhpcy51c2Vycy5kZXNrdG9wID0gc29ja2V0LmlkO1xuICAgIHNvY2tldC5yb29tID0gcm9vbUlkO1xuICAgIHRoaXMucGFzc3dvcmQuY3JlYXRlVXNlcnNQYXNzd29yZChyb29tSWQsIHNvY2tldCk7XG4gXG4gICAgLy8gcmVtb3ZlIGlkIGZyb20gYXZhaWJsZSByb29tXG4gICAgaWYgKHJhbmRvbUluZGV4ID4gLTEpIHtcbiAgICAgIFJvb21zLnJvb21BcnIuc3BsaWNlKHJhbmRvbUluZGV4LCAxKTtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhgVGhlIHJvb20gd2l0aCB0aGUgaWQgOiR7cmFuZG9tUm9vbX0gaXMgY3JlYXRlZGApO1xuICB9XG5cbiAgZGVzdHJveShpbywgc29ja2V0KSB7XG4gICAgc29ja2V0Lm9uKCdkaXNjb25uZWN0JywgKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ3VzZXIgZGlzY29ubmVjdGVkJyk7XG4gICAgICBsZXQgcm9vbUlkID0gc29ja2V0LnJvb207XG4gICAgICB2YXIgcmV0ID0gcm9vbUlkLnJlcGxhY2UoL3Jvb20tL2csICcnKTtcbiAgICAgIFJvb21zLnJvb21BcnIucHVzaChyZXQpO1xuXG4gICAgICB2YXIgaW5kZXggPSBSb29tcy5hY3RpdmVSb29tLmluZGV4T2YocmV0KTtcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIFJvb21zLmFjdGl2ZVJvb20uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cblxuICAgICAgaW8udG8ocm9vbUlkKS5lbWl0KCd1c2VyRGlzY29ubmVjdGVkJywgJ3BlcnRlIGRlIGxhIGNvbm5lY3Rpb24nKTtcbiAgICAgIGlvLm9mKCcvJylcbiAgICAgICAgLmluKHJvb21JZClcbiAgICAgICAgLmNsaWVudHMoKGVycm9yLCBzb2NrZXRJZHMpID0+IHtcbiAgICAgICAgICBpZiAoZXJyb3IpIHRocm93IGVycm9yO1xuICAgICAgICAgIHNvY2tldElkcy5mb3JFYWNoKHNvY2tldElkID0+XG4gICAgICAgICAgICBpby5zb2NrZXRzLnNvY2tldHNbc29ja2V0SWRdLmxlYXZlKHNvY2tldClcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGN1cnJlbnRTdGVwID0gKGlvLCBzb2NrZXQpID0+IHtcbiAgICBzb2NrZXQub24oJ2N1cnJlbnRTdGVwJywgZGF0YSA9PiB7XG4gICAgICBpby50byhzb2NrZXQucm9vbSkuZW1pdCgnY3VycmVudFN0ZXAnLCB7XG4gICAgICAgIHN0ZXA6IGRhdGEuc3RlcFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgdXNlckN1cnJlbnRTdGVwID0gKGlvLCBzb2NrZXQpID0+IHtcbiAgICBzb2NrZXQub24oJ3VzZXJDdXJyZW50U3RlcCcsIGRhdGEgPT4ge1xuICAgICAgaW8udG8odGhpcy51c2Vyc1tkYXRhLnVzZXJJZF0uc29ja2V0SWQpLmVtaXQoJ2N1cnJlbnRTdGVwJywge1xuICAgICAgICBzdGVwOiBkYXRhLnN0ZXBcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHNob3dEYW5nZXIgPSAoaW8sIHNvY2tldCkgPT4ge1xuICAgIHNvY2tldC5vbignc2hvd0RhbmdlcicsIGRhdGEgPT4ge1xuICAgICAgaW8udG8odGhpcy51c2Vyc1tkYXRhLnVzZXJJZF0uc29ja2V0SWQpLmVtaXQoJ3Nob3dEYW5nZXInLCB7XG4gICAgICAgIHNob3dEYW5nZXI6IGRhdGEuc2hvd0RhbmdlclxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgZ2V0VXNlcklkKHNvY2tldCkge1xuICAgIHNvY2tldC5vbigndGVzJywgdXNlcklEID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCd1biBub3V2ZWxsZSB1c2VySUQgZXN0IGxhOiAnLCB1c2VySUQpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=