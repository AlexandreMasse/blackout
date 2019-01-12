import Password from './Password'
import Rooms from './Rooms'

export default class Room {

    constructor() {
        console.log()
        this.password = new Password()
        this.users = {desktop: null, player1: null, player2: null}
    }
    
    create(socket) {
        Rooms.roomIndex++
        this.roomArr = Rooms.roomArr
        this.roomIndex++
        let roomId = `room-${Rooms.roomIndex}`
        socket.join(roomId)
        this.roomArr.push(roomId)
        this.users.desktop = socket.id
        console.log(this.users)
        socket.room = roomId
        this.password.createUsersPassword(roomId, socket)
        console.log(`The room number ${Rooms.roomIndex} is created`)
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
                if (error) throw error
                socketIds.forEach(socketId => io.sockets.sockets[socketId].leave(socket))
            })
        })
    }
}