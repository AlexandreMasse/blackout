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
      var roomId = "room-".concat(_Rooms.default.roomIndex);
      socket.join(roomId);

      _Rooms.default.roomArr.push(roomId);

      _Rooms.default.roomArrId.push(socket.id);

      this.users.desktop = socket.id;
      socket.room = roomId;
      this.password.createUsersPassword(roomId, socket);
      console.log("The room number ".concat(_Rooms.default.roomIndex, " is created"));
    }
  }, {
    key: "destroy",
    value: function destroy(io, socket) {
      socket.on('disconnect', function () {
        console.log('user disconnected');
        var roomId = socket.room;
        console.log(roomId);

        var index = _Rooms.default.roomArrId.indexOf(roomId);

        if (index > -1) {
          _Rooms.default.roomArrId.splice(index, 1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL21vZHVsZXMvUm9vbS5qcyJdLCJuYW1lcyI6WyJSb29tIiwic29ja2V0IiwiaW8iLCJvbiIsImRhdGEiLCJ0byIsInJvb20iLCJlbWl0Iiwic3RlcCIsInVzZXJzIiwidXNlcklkIiwic29ja2V0SWQiLCJzaG93RGFuZ2VyIiwidXNlckluUm9vbSIsInBhc3N3b3JkIiwiUGFzc3dvcmQiLCJnZXRVc2VySWQiLCJSb29tcyIsInJvb21JbmRleCIsInJvb21JZCIsImpvaW4iLCJyb29tQXJyIiwicHVzaCIsInJvb21BcnJJZCIsImlkIiwiZGVza3RvcCIsImNyZWF0ZVVzZXJzUGFzc3dvcmQiLCJjb25zb2xlIiwibG9nIiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwib2YiLCJpbiIsImNsaWVudHMiLCJlcnJvciIsInNvY2tldElkcyIsImZvckVhY2giLCJzb2NrZXRzIiwibGVhdmUiLCJ1c2VySUQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7QUFFakIsZ0JBQVlDLE9BQVosRUFBb0I7QUFBQTs7QUFBQTs7QUFBQSx5Q0FzQ04sVUFBQ0MsRUFBRCxFQUFLRCxNQUFMLEVBQWdCO0FBQzFCQSxNQUFBQSxNQUFNLENBQUNFLEVBQVAsQ0FBVSxhQUFWLEVBQXlCLFVBQUNDLElBQUQsRUFBVTtBQUMvQkYsUUFBQUEsRUFBRSxDQUFDRyxFQUFILENBQU1KLE1BQU0sQ0FBQ0ssSUFBYixFQUFtQkMsSUFBbkIsQ0FBd0IsYUFBeEIsRUFBdUM7QUFDbkNDLFVBQUFBLElBQUksRUFBRUosSUFBSSxDQUFDSTtBQUR3QixTQUF2QztBQUdILE9BSkQ7QUFLSCxLQTVDbUI7O0FBQUEsNkNBOENGLFVBQUNOLEVBQUQsRUFBS0QsTUFBTCxFQUFnQjtBQUM5QkEsTUFBQUEsTUFBTSxDQUFDRSxFQUFQLENBQVUsaUJBQVYsRUFBNkIsVUFBQ0MsSUFBRCxFQUFVO0FBQ25DRixRQUFBQSxFQUFFLENBQUNHLEVBQUgs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Q0FBVSxLQUFWLEVBQWlCLFVBQUNxQyxNQUFELEVBQVc7QUFDeEJiLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDZCQUFaLEVBQTJDWSxNQUEzQztBQUNILE9BRkQ7QUFHSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXNzd29yZCBmcm9tICcuL1Bhc3N3b3JkJ1xuaW1wb3J0IFJvb21zIGZyb20gJy4vUm9vbXMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvb20ge1xuXG4gICAgY29uc3RydWN0b3Ioc29ja2V0KSB7XG4gICAgICAgIHRoaXMudXNlckluUm9vbSA9IDBcbiAgICAgICAgdGhpcy5wYXNzd29yZCA9IG5ldyBQYXNzd29yZCgpXG4gICAgICAgIHRoaXMudXNlcnMgPSB7fSAvLyB7ZGVza3RvcDogbnVsbCwgcGxheWVyMTogbnVsbCwgcGxheWVyMjogbnVsbH1cbiAgICAgICAgdGhpcy5nZXRVc2VySWQoc29ja2V0KVxuICAgIH1cbiAgICBcbiAgICBjcmVhdGUoc29ja2V0KSB7XG4gICAgICAgIFJvb21zLnJvb21JbmRleCsrXG4gICAgICAgIGxldCByb29tSWQgPSBgcm9vbS0ke1Jvb21zLnJvb21JbmRleH1gXG4gICAgICAgIHNvY2tldC5qb2luKHJvb21JZClcbiAgICAgICAgUm9vbXMucm9vbUFyci5wdXNoKHJvb21JZClcbiAgICAgICAgUm9vbXMucm9vbUFycklkLnB1c2goc29ja2V0LmlkKVxuICAgICAgICB0aGlzLnVzZXJzLmRlc2t0b3AgPSBzb2NrZXQuaWRcbiAgICAgICAgc29ja2V0LnJvb20gPSByb29tSWRcbiAgICAgICAgdGhpcy5wYXNzd29yZC5jcmVhdGVVc2Vyc1Bhc3N3b3JkKHJvb21JZCwgc29ja2V0KVxuICAgICAgICBjb25zb2xlLmxvZyhgVGhlIHJvb20gbnVtYmVyICR7Um9vbXMucm9vbUluZGV4fSBpcyBjcmVhdGVkYClcbiAgICB9XG5cbiAgICBkZXN0cm95KGlvLCBzb2NrZXQpIHtcbiAgICAgICAgc29ja2V0Lm9uKCdkaXNjb25uZWN0JywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3VzZXIgZGlzY29ubmVjdGVkJylcbiAgICAgICAgICAgIGxldCByb29tSWQgPSBzb2NrZXQucm9vbVxuICAgICAgICAgICAgY29uc29sZS5sb2cocm9vbUlkKVxuICAgICAgICAgICAgdmFyIGluZGV4ID0gUm9vbXMucm9vbUFycklkLmluZGV4T2Yocm9vbUlkKVxuICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgICAgICBSb29tcy5yb29tQXJySWQuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW8udG8ocm9vbUlkKS5lbWl0KCd1c2VyRGlzY29ubmVjdGVkJyxcbiAgICAgICAgICAgICdwZXJ0ZSBkZSBsYSBjb25uZWN0aW9uJ1xuICAgICAgICAgICAgKVxuICAgICAgICAgICAgaW8ub2YoJy8nKS5pbihyb29tSWQpLmNsaWVudHMoKGVycm9yLCBzb2NrZXRJZHMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHRocm93IGVycm9yXG4gICAgICAgICAgICAgICAgc29ja2V0SWRzLmZvckVhY2goc29ja2V0SWQgPT4gaW8uc29ja2V0cy5zb2NrZXRzW3NvY2tldElkXS5sZWF2ZShzb2NrZXQpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjdXJyZW50U3RlcCA9IChpbyAsc29ja2V0KSA9PiB7XG4gICAgICAgIHNvY2tldC5vbignY3VycmVudFN0ZXAnLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgaW8udG8oc29ja2V0LnJvb20pLmVtaXQoJ2N1cnJlbnRTdGVwJywge1xuICAgICAgICAgICAgICAgIHN0ZXA6IGRhdGEuc3RlcFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB1c2VyQ3VycmVudFN0ZXAgPSAoaW8sIHNvY2tldCkgPT4ge1xuICAgICAgICBzb2NrZXQub24oJ3VzZXJDdXJyZW50U3RlcCcsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBpby50byh0aGlzLnVzZXJzW2RhdGEudXNlcklkXS5zb2NrZXRJZCkuZW1pdCgnY3VycmVudFN0ZXAnLCB7XG4gICAgICAgICAgICAgICAgc3RlcDogZGF0YS5zdGVwXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHNob3dEYW5nZXIgPSAoaW8gLHNvY2tldCkgPT4ge1xuICAgICAgICBzb2NrZXQub24oJ3Nob3dEYW5nZXInLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgaW8udG8odGhpcy51c2Vyc1tkYXRhLnVzZXJJZF0uc29ja2V0SWQpLmVtaXQoJ3Nob3dEYW5nZXInLCB7XG4gICAgICAgICAgICAgICAgc2hvd0RhbmdlcjogZGF0YS5zaG93RGFuZ2VyXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGdldFVzZXJJZChzb2NrZXQpIHtcbiAgICAgICAgc29ja2V0Lm9uKCd0ZXMnLCAodXNlcklEKSA9PntcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1biBub3V2ZWxsZSB1c2VySUQgZXN0IGxhOiAnLCB1c2VySUQpXG4gICAgICAgIH0pXG4gICAgfVxufSJdfQ==