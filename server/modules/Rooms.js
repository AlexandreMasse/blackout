let roomIndex = 0
let roomArr = []
let roomArrId = []

export default class Rooms {
    static roomIndex = roomIndex
    static roomArr = roomArr
    static roomArrId = roomArrId

    init() {
        Rooms.roomIndex = roomIndex
        Rooms.roomArr = roomArr
        Rooms.roomArrId = roomArrId
    }
}
