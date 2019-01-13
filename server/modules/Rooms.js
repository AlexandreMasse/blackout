let roomIndex = 0
let roomArr = []
let roomArrId = []
let roomArrInstance = []

export default class Rooms {
    static roomIndex = roomIndex
    static roomArr = roomArr
    static roomArrId = roomArrId
    static roomArrInstance = roomArrInstance

    init() {
        Rooms.roomIndex = roomIndex
        Rooms.roomArr = roomArr
        Rooms.roomArrId = roomArrId 
        Rooms.roomArrInstance = roomArrInstance
    }
}
