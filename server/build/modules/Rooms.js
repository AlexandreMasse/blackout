"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var roomIndex = 0;
var roomArr = [];
var roomArrId = [];
var roomArrInstance = [];

var Rooms =
/*#__PURE__*/
function () {
  function Rooms() {
    _classCallCheck(this, Rooms);
  }

  _createClass(Rooms, [{
    key: "init",
    value: function init() {
      Rooms.roomIndex = roomIndex;
      Rooms.roomArr = roomArr;
      Rooms.roomArrId = roomArrId;
      Rooms.roomArrInstance = roomArrInstance;
    }
  }]);

  return Rooms;
}();

exports.default = Rooms;

_defineProperty(Rooms, "roomIndex", roomIndex);

_defineProperty(Rooms, "roomArr", roomArr);

_defineProperty(Rooms, "roomArrId", roomArrId);

_defineProperty(Rooms, "roomArrInstance", roomArrInstance);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL21vZHVsZXMvUm9vbXMuanMiXSwibmFtZXMiOlsicm9vbUluZGV4Iiwicm9vbUFyciIsInJvb21BcnJJZCIsInJvb21BcnJJbnN0YW5jZSIsIlJvb21zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxTQUFTLEdBQUcsQ0FBaEI7QUFDQSxJQUFJQyxPQUFPLEdBQUcsRUFBZDtBQUNBLElBQUlDLFNBQVMsR0FBRyxFQUFoQjtBQUNBLElBQUlDLGVBQWUsR0FBRyxFQUF0Qjs7SUFFcUJDLEs7Ozs7Ozs7OzsyQkFNVjtBQUNIQSxNQUFBQSxLQUFLLENBQUNKLFNBQU4sR0FBa0JBLFNBQWxCO0FBQ0FJLE1BQUFBLEtBQUssQ0FBQ0gsT0FBTixHQUFnQkEsT0FBaEI7QUFDQUcsTUFBQUEsS0FBSyxDQUFDRixTQUFOLEdBQWtCQSxTQUFsQjtBQUNBRSxNQUFBQSxLQUFLLENBQUNELGVBQU4sR0FBd0JBLGVBQXhCO0FBQ0g7Ozs7Ozs7O2dCQVhnQkMsSyxlQUNFSixTOztnQkFERkksSyxhQUVBSCxPOztnQkFGQUcsSyxlQUdFRixTOztnQkFIRkUsSyxxQkFJUUQsZSIsInNvdXJjZXNDb250ZW50IjpbImxldCByb29tSW5kZXggPSAwXG5sZXQgcm9vbUFyciA9IFtdXG5sZXQgcm9vbUFycklkID0gW11cbmxldCByb29tQXJySW5zdGFuY2UgPSBbXVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb29tcyB7XG4gICAgc3RhdGljIHJvb21JbmRleCA9IHJvb21JbmRleFxuICAgIHN0YXRpYyByb29tQXJyID0gcm9vbUFyclxuICAgIHN0YXRpYyByb29tQXJySWQgPSByb29tQXJySWRcbiAgICBzdGF0aWMgcm9vbUFyckluc3RhbmNlID0gcm9vbUFyckluc3RhbmNlXG5cbiAgICBpbml0KCkge1xuICAgICAgICBSb29tcy5yb29tSW5kZXggPSByb29tSW5kZXhcbiAgICAgICAgUm9vbXMucm9vbUFyciA9IHJvb21BcnJcbiAgICAgICAgUm9vbXMucm9vbUFycklkID0gcm9vbUFycklkIFxuICAgICAgICBSb29tcy5yb29tQXJySW5zdGFuY2UgPSByb29tQXJySW5zdGFuY2VcbiAgICB9XG59XG4iXX0=