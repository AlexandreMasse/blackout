let roomIndex = 0;
let roomArr = [];
let activeRoom = [];
let roomArrId = [];
let roomArrInstance = [];
const maxRoomNb = 8998;
for (var i = 0; i <= maxRoomNb; i++) {
  roomArr.push(i);
}
// 8998
export default class Rooms {
  static roomIndex = roomIndex;
  static roomArr = roomArr;
  static roomArrId = roomArrId;
  static activeRoom = activeRoom;
  static roomArrInstance = roomArrInstance;

  init() {
    Rooms.roomIndex = roomIndex;
    Rooms.roomArr = roomArr;
    Rooms.roomArrId = roomArrId;
    Rooms.activeRoom = activeRoom;
    Rooms.roomArrInstance = roomArrInstance;
  }
}
