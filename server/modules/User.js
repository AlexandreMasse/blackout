import password from './Password'

export default class User {
    constructor() {
    }

    init() {

    }

    connect(io, socket) {
        socket.on('sendCode', (data) => {
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
                socket.room = roomId
                io.to(roomId).emit('connectToRoom', {
                room: roomId,
                userId: userId
                })
                delete password.activePasswordObj[code]
            } else {
                console.log('mdp nom définit')
                socket.emit('connectToRoom', "Une erreur s'est produite")
            }
        })
    }

    disconnect(io, socket) {
        socket.on('disconnect', () => {
            // console.log(socket.username)
            // console.log(socket.room)
            // console.log(socket.code)
            let code = socket.code 
            password.passwordArr.push(code)
            io.to(socket.room).emit('disconnectToRoom', {
            room: socket.room,
            userId: socket.username
            })
            console.log('user mobile disconnected')
        })
    }
}