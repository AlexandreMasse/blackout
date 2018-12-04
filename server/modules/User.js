export default class User {
    constructor() {

    }

    init() {

    }

    connect(io, socket) {
        socket.on('sendCode', (data) => {
            console.log('hello', data.key)
            let code = data.key
            if(activeCodeObj[code]) {
                console.log(activeCodeObj[code])
                let roomNameData = activeCodeObj[code]
                var parts = roomNameData.split('_', 2)
                let roomName = parts[0]
                let userId = parts[1]
                socket.username = userId
                socket.room = roomName
                socket.code = code
                socket.join(roomName)
                socket.room = roomName
                io.to(roomName).emit('connectToRoom', {
                room: roomName,
                userId: userId
                })
                delete activeCodeObj[code]
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
            codeArr.push(code)
            io.to(socket.room).emit('disconnectToRoom', {
            room: socket.room,
            userId: socket.username
            })
            console.log('user mobile disconnected')
        })
    }
}