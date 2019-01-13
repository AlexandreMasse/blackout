import Password from './Password'
import Rooms from './Rooms'

export default class Room {

    constructor(socket) {
        this.userInRoom = 0
        this.password = new Password()
        this.users = {desktop: null, player1: null, player2: null}
        this.getUserId(socket)
    }
    
    create(socket) {
        Rooms.roomIndex++
        let roomId = `room-${Rooms.roomIndex}`
        socket.join(roomId)
        Rooms.roomArr.push(roomId)
        Rooms.roomArrId.push(socket.id)
        this.users.desktop = socket.id
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

    getUserId(socket) {
        socket.on('tes', (userID) =>{
            console.log('un nouvelle userID est la: ', userID)
        })
    }
}