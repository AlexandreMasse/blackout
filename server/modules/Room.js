import Password from './Password'

export default class Room {

    init() {
        console.log('hm')
        this.roomIndex = 0
        this.roomArr = []
        this.password = new Password()
    }

    create(socket) {
        this.roomIndex++
        let roomId = `room-${this.roomIndex}`
        socket.join(roomId)
        this.roomArr.push(roomId)
        socket.room = roomId
        this.password.createUsersPassword(roomId, socket)
        console.log(`connected client in room ${this.roomIndex}`)
    }

    destroy(socket) {
        socket.on('disconnect', () => {
            console.log('user disconnected')
            let roomId = socket.room
            console.log(roomId)
            var index = roomArr.indexOf(roomId)
            if (index > -1) {
                roomArr.splice(index, 1)
            }
            console.log(roomArr)
            // var clients = io.sockets.clients('room'); // all users from room `room`
            // var usersInRoom = io.of('/').in(socket.room).clients
            // console.log(usersInRoom)
            io.to(socket.room).emit('userDisconnected',
                'perte de la connection'
                // users: usersInRoom
            )
        })
    }
}