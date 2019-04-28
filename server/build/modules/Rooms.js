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
var activeRoom = [];
var roomArrId = [];
var roomArrInstance = [];
var maxRoomNb = 8998;

for (var i = 0; i <= maxRoomNb; i++) {
  roomArr.push(i);
} // 8998


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
      Rooms.activeRoom = activeRoom;
      Rooms.roomArrInstance = roomArrInstance;
    }
  }]);

  return Rooms;
}();

exports.default = Rooms;

_defineProperty(Rooms, "roomIndex", roomIndex);

_defineProperty(Rooms, "roomArr", roomArr);

_defineProperty(Rooms, "roomArrId", roomArrId);

_defineProperty(Rooms, "activeRoom", activeRoom);

_defineProperty(Rooms, "roomArrInstance", roomArrInstance);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL21vZHVsZXMvUm9vbXMuanMiXSwibmFtZXMiOlsicm9vbUluZGV4Iiwicm9vbUFyciIsImFjdGl2ZVJvb20iLCJyb29tQXJySWQiLCJyb29tQXJySW5zdGFuY2UiLCJtYXhSb29tTmIiLCJpIiwicHVzaCIsIlJvb21zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxTQUFTLEdBQUcsQ0FBaEI7QUFDQSxJQUFJQyxPQUFPLEdBQUcsRUFBZDtBQUNBLElBQUlDLFVBQVUsR0FBRyxFQUFqQjtBQUNBLElBQUlDLFNBQVMsR0FBRyxFQUFoQjtBQUNBLElBQUlDLGVBQWUsR0FBRyxFQUF0QjtBQUNBLElBQU1DLFNBQVMsR0FBRyxJQUFsQjs7QUFDQSxLQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLElBQUlELFNBQXJCLEVBQWdDQyxDQUFDLEVBQWpDLEVBQXFDO0FBQ25DTCxFQUFBQSxPQUFPLENBQUNNLElBQVIsQ0FBYUQsQ0FBYjtBQUNELEMsQ0FDRDs7O0lBQ3FCRSxLOzs7Ozs7Ozs7MkJBT1o7QUFDTEEsTUFBQUEsS0FBSyxDQUFDUixTQUFOLEdBQWtCQSxTQUFsQjtBQUNBUSxNQUFBQSxLQUFLLENBQUNQLE9BQU4sR0FBZ0JBLE9BQWhCO0FBQ0FPLE1BQUFBLEtBQUssQ0FBQ0wsU0FBTixHQUFrQkEsU0FBbEI7QUFDQUssTUFBQUEsS0FBSyxDQUFDTixVQUFOLEdBQW1CQSxVQUFuQjtBQUNBTSxNQUFBQSxLQUFLLENBQUNKLGVBQU4sR0FBd0JBLGVBQXhCO0FBQ0Q7Ozs7Ozs7O2dCQWJrQkksSyxlQUNBUixTOztnQkFEQVEsSyxhQUVGUCxPOztnQkFGRU8sSyxlQUdBTCxTOztnQkFIQUssSyxnQkFJQ04sVTs7Z0JBSkRNLEsscUJBS01KLGUiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgcm9vbUluZGV4ID0gMDtcbmxldCByb29tQXJyID0gW107XG5sZXQgYWN0aXZlUm9vbSA9IFtdO1xubGV0IHJvb21BcnJJZCA9IFtdO1xubGV0IHJvb21BcnJJbnN0YW5jZSA9IFtdO1xuY29uc3QgbWF4Um9vbU5iID0gODk5ODtcbmZvciAodmFyIGkgPSAwOyBpIDw9IG1heFJvb21OYjsgaSsrKSB7XG4gIHJvb21BcnIucHVzaChpKTtcbn1cbi8vIDg5OThcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvb21zIHtcbiAgc3RhdGljIHJvb21JbmRleCA9IHJvb21JbmRleDtcbiAgc3RhdGljIHJvb21BcnIgPSByb29tQXJyO1xuICBzdGF0aWMgcm9vbUFycklkID0gcm9vbUFycklkO1xuICBzdGF0aWMgYWN0aXZlUm9vbSA9IGFjdGl2ZVJvb207XG4gIHN0YXRpYyByb29tQXJySW5zdGFuY2UgPSByb29tQXJySW5zdGFuY2U7XG5cbiAgaW5pdCgpIHtcbiAgICBSb29tcy5yb29tSW5kZXggPSByb29tSW5kZXg7XG4gICAgUm9vbXMucm9vbUFyciA9IHJvb21BcnI7XG4gICAgUm9vbXMucm9vbUFycklkID0gcm9vbUFycklkO1xuICAgIFJvb21zLmFjdGl2ZVJvb20gPSBhY3RpdmVSb29tO1xuICAgIFJvb21zLnJvb21BcnJJbnN0YW5jZSA9IHJvb21BcnJJbnN0YW5jZTtcbiAgfVxufVxuIl19