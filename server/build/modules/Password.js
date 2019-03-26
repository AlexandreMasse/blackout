"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var minPassword = 1000;
var maxPassword = 9999;
var passwordArr = [];
var activePasswordObj = {};

for (var i = minPassword; i <= maxPassword; i++) {
  passwordArr.push(i);
}

var Password =
/*#__PURE__*/
function () {
  function Password() {
    _classCallCheck(this, Password);
  }

  _createClass(Password, [{
    key: "createPassword",
    value: function createPassword() {
      var code = Password.passwordArr.splice(Math.floor(Password.passwordArr.length * Math.random()), 1);
      console.log(code);
      return code.length ? code[0] : null;
    }
  }, {
    key: "createUsersPassword",
    value: function createUsersPassword(roomId, socket) {
      var player1 = this.createPassword();
      var player2 = this.createPassword();
      Password.activePasswordObj[player1] = "".concat(roomId, "_player1");
      Password.activePasswordObj[player2] = "".concat(roomId, "_player2");
      socket.emit('createRoom', {
        roomId: roomId,
        password1: player1,
        password2: player2
      });
      console.log(Password.activePasswordObj);
    }
  }]);

  return Password;
}();

exports.default = Password;

_defineProperty(Password, "passwordArr", passwordArr);

_defineProperty(Password, "activePasswordObj", activePasswordObj);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL21vZHVsZXMvUGFzc3dvcmQuanMiXSwibmFtZXMiOlsibWluUGFzc3dvcmQiLCJtYXhQYXNzd29yZCIsInBhc3N3b3JkQXJyIiwiYWN0aXZlUGFzc3dvcmRPYmoiLCJpIiwicHVzaCIsIlBhc3N3b3JkIiwiY29kZSIsInNwbGljZSIsIk1hdGgiLCJmbG9vciIsImxlbmd0aCIsInJhbmRvbSIsImNvbnNvbGUiLCJsb2ciLCJyb29tSWQiLCJzb2NrZXQiLCJwbGF5ZXIxIiwiY3JlYXRlUGFzc3dvcmQiLCJwbGF5ZXIyIiwiZW1pdCIsInBhc3N3b3JkMSIsInBhc3N3b3JkMiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsV0FBVyxHQUFHLElBQWxCO0FBQ0EsSUFBSUMsV0FBVyxHQUFHLElBQWxCO0FBQ0EsSUFBSUMsV0FBVyxHQUFHLEVBQWxCO0FBQ0EsSUFBSUMsaUJBQWlCLEdBQUcsRUFBeEI7O0FBQ0EsS0FBSyxJQUFJQyxDQUFDLEdBQUdKLFdBQWIsRUFBMEJJLENBQUMsSUFBSUgsV0FBL0IsRUFBNENHLENBQUMsRUFBN0MsRUFBaUQ7QUFDL0NGLEVBQUFBLFdBQVcsQ0FBQ0csSUFBWixDQUFpQkQsQ0FBakI7QUFDRDs7SUFFb0JFLFE7Ozs7Ozs7OztxQ0FJQTtBQUNiLFVBQUlDLElBQUksR0FBR0QsUUFBUSxDQUFDSixXQUFULENBQXFCTSxNQUFyQixDQUE0QkMsSUFBSSxDQUFDQyxLQUFMLENBQVdKLFFBQVEsQ0FBQ0osV0FBVCxDQUFxQlMsTUFBckIsR0FBNEJGLElBQUksQ0FBQ0csTUFBTCxFQUF2QyxDQUE1QixFQUFtRixDQUFuRixDQUFYO0FBQ0FDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZUCxJQUFaO0FBQ0EsYUFBT0EsSUFBSSxDQUFDSSxNQUFMLEdBQWNKLElBQUksQ0FBQyxDQUFELENBQWxCLEdBQXdCLElBQS9CO0FBQ0g7Ozt3Q0FFbUJRLE0sRUFBUUMsTSxFQUFRO0FBQ2hDLFVBQUlDLE9BQU8sR0FBRyxLQUFLQyxjQUFMLEVBQWQ7QUFDQSxVQUFJQyxPQUFPLEdBQUcsS0FBS0QsY0FBTCxFQUFkO0FBQ0FaLE1BQUFBLFFBQVEsQ0FBQ0gsaUJBQVQsQ0FBNEJjLE9BQTVCLGNBQTJDRixNQUEzQztBQUNBVCxNQUFBQSxRQUFRLENBQUNILGlCQUFULENBQTRCZ0IsT0FBNUIsY0FBMkNKLE1BQTNDO0FBRUFDLE1BQUFBLE1BQU0sQ0FBQ0ksSUFBUCxDQUFZLFlBQVosRUFBMEI7QUFDeEJMLFFBQUFBLE1BQU0sRUFBRUEsTUFEZ0I7QUFFeEJNLFFBQUFBLFNBQVMsRUFBRUosT0FGYTtBQUd4QkssUUFBQUEsU0FBUyxFQUFFSDtBQUhhLE9BQTFCO0FBS0FOLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZUixRQUFRLENBQUNILGlCQUFyQjtBQUNEOzs7Ozs7OztnQkF0QmNHLFEsaUJBQ0lKLFc7O2dCQURKSSxRLHVCQUVVSCxpQiIsInNvdXJjZXNDb250ZW50IjpbImxldCBtaW5QYXNzd29yZCA9IDEwMDBcbmxldCBtYXhQYXNzd29yZCA9IDk5OTlcbmxldCBwYXNzd29yZEFyciA9IFtdXG5sZXQgYWN0aXZlUGFzc3dvcmRPYmogPSB7fVxuZm9yICh2YXIgaSA9IG1pblBhc3N3b3JkOyBpIDw9IG1heFBhc3N3b3JkOyBpKyspIHtcbiAgcGFzc3dvcmRBcnIucHVzaChpKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXNzd29yZCB7XG4gICAgc3RhdGljIHBhc3N3b3JkQXJyID0gcGFzc3dvcmRBcnJcbiAgICBzdGF0aWMgYWN0aXZlUGFzc3dvcmRPYmogPSBhY3RpdmVQYXNzd29yZE9ialxuXG4gICAgY3JlYXRlUGFzc3dvcmQoKSB7XG4gICAgICAgIGxldCBjb2RlID0gUGFzc3dvcmQucGFzc3dvcmRBcnIuc3BsaWNlKE1hdGguZmxvb3IoUGFzc3dvcmQucGFzc3dvcmRBcnIubGVuZ3RoKk1hdGgucmFuZG9tKCkpLCAxKVxuICAgICAgICBjb25zb2xlLmxvZyhjb2RlKVxuICAgICAgICByZXR1cm4gY29kZS5sZW5ndGggPyBjb2RlWzBdIDogbnVsbFxuICAgIH1cblxuICAgIGNyZWF0ZVVzZXJzUGFzc3dvcmQocm9vbUlkLCBzb2NrZXQpIHtcbiAgICAgICAgbGV0IHBsYXllcjEgPSB0aGlzLmNyZWF0ZVBhc3N3b3JkKClcbiAgICAgICAgbGV0IHBsYXllcjIgPSB0aGlzLmNyZWF0ZVBhc3N3b3JkKClcbiAgICAgICAgUGFzc3dvcmQuYWN0aXZlUGFzc3dvcmRPYmpbIHBsYXllcjEgXSA9IGAke3Jvb21JZH1fcGxheWVyMWBcbiAgICAgICAgUGFzc3dvcmQuYWN0aXZlUGFzc3dvcmRPYmpbIHBsYXllcjIgXSA9IGAke3Jvb21JZH1fcGxheWVyMmBcbiAgXG4gICAgICAgIHNvY2tldC5lbWl0KCdjcmVhdGVSb29tJywge1xuICAgICAgICAgIHJvb21JZDogcm9vbUlkLCBcbiAgICAgICAgICBwYXNzd29yZDE6IHBsYXllcjEsXG4gICAgICAgICAgcGFzc3dvcmQyOiBwbGF5ZXIyLFxuICAgICAgICB9KVxuICAgICAgICBjb25zb2xlLmxvZyhQYXNzd29yZC5hY3RpdmVQYXNzd29yZE9iailcbiAgICAgIH1cbn0iXX0=