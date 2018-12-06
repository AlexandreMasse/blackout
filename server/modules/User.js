import password from './Password'

export default class User {
    constructor() {
    }

    connect(io, socket) {
        socket.on('password', (data) => {
            console.log('hello', data.key)
            let code = data.key
            if(password.activePasswordObj[code]) {
                console.log(password.activePasswordObj[code])
                let roomNameData = password.activePasswordObj[code]
                var parts = roomNameData.split('_', 2)
                let roomId = parts[0]
                let userId = parts[1]
                socket.username = userId
                socket.room = roomId
                socket.code = code
                socket.join(roomId)
                io.to(roomId).emit('connectToRoom', {
                roomId: roomId,
                userId: userId
                })
                delete password.activePasswordObj[code]
            } else {
                console.log('mdp nom définit')
                socket.emit('connectToRoom', "Une erreur s'est produite")
            }
        })
    }

    reconnect(io, socket) {
        socket.on('reconnect' , (data) => {
            console.log("on sendCookie", data)
            socket.username = data.userId
                socket.room = data.roomId
                socket.join(data.roomId)
                io.to(data.roomId).emit('connectToRoom', {
                roomId: data.roomId,
                userId: data.userId
            })
        })
    }

    disconnect(io, socket) {
        socket.on('disconnect', () => {
            let code = socket.code 
            password.passwordArr.push(code)
            io.to(socket.room).emit('disconnectToRoom', {
            roomId: socket.room,
            userId: socket.username
            })
            console.log('user mobile disconnected')
        })
    }
}