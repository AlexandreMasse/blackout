import Password from './Password'

export default class Room {

    init() {
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

    destroy(io, socket) {
        socket.on('disconnect', () => {
            console.log('user disconnected')
            let roomId = socket.room
            console.log(roomId)
            var index = this.roomArr.indexOf(roomId)
            if (index > -1) {
                this.roomArr.splice(index, 1)
            }
            console.log(this.roomArr)
            io.to(roomId).emit('userDisconnected',
            'perte de la connection'
            )
            io.of('/').in(roomId).clients((error, socketIds) => {
                if (error) throw error;
                socketIds.forEach(socketId => io.sockets.sockets[socketId].leave(socket))
            })
        })
    }
}