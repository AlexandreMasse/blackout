import password from './Password'
import Rooms from './Rooms'

export default class User {
    constructor() {
        this.phoneDataObject = {}
    }

    connect = (io, socket) => {
        socket.on('password', (data) => {
            console.log('hello', data.key)
            const code = data.key
            if(password.activePasswordObj[code]) {
                const roomNameData = password.activePasswordObj[code]
                const parts = roomNameData.split('_', 2)
                const roomId = parts[0]
                const userId = parts[1]
                this.getRoomInstance(roomId)
                socket.username = userId
                socket.room = roomId
                socket.code = code 
                socket.join(roomId)
                io.to(roomId).emit('connectToRoom', {
                    roomId: roomId,
                    userId: userId,
                    password: code
                })
                
                //Emit phone data after connexion
                io.to(socket.room).emit('phoneData', {
                    phoneData: this.phoneDataObject,
                    userId: socket.username
                })
                delete password.activePasswordObj[code]
            } else {
                console.log('mdp nom définit')
                socket.emit('connectToRoom', "Une erreur s'est produite")
            }
        })
    }

    reconnect = (io, socket) => {
        socket.on('reco' , (data) => {
                console.log("on sendCookie", data)
                socket.username = data.userId
                socket.room = data.roomId

                io.in(data.roomId).clients((err, clients) => {
                    console.log(clients)
                    var size = Object.keys(clients).length;
                    console.log(size)
                    if (size > 1 ) {
                        socket.join(data.roomId)
                        io.to(roomId).emit('connectToRoom', {
                            roomId: data.roomId,
                            userId: data.userId
                        })
                        // io.to(data.roomId).emit('connectToRoom', {
                        //     roomId: data.roomId,
                        //     userId: data.userId
                        // })
                    }
                })
        })
    }

    disconnect = (io, socket) => {
        socket.on('disconnect', () => {
            let code = socket.code 
            password.passwordArr.push(code)
            io.to(socket.room).emit('disconnectToRoom', {
            roomId: socket.room,
            userId: socket.username
            })
            console.log(`user ${socket.username} mobile disconnected`)
        })
    }

    phoneData = (io, socket) => {
        socket.on('phoneData', (data) => {
            this.phoneDataObject = data.phoneData
        })
    }

    position = (io,socket) => {
        socket.on('position', (data) => {
            io.to(socket.room).emit('position', {
            position: data.position,
            userId: socket.username
            })
        })
    }

    getRoomInstance(roomId) {
        const parts = roomId.split('-', 2)
        const roomIndex = parseInt(parts[1])
        this.roomInstance = Rooms.roomArrInstance[roomIndex - 1]
        console.log('la room actuelle est :',roomId , "et son instance : ", this.roomInstance)
    }

    sendUserId(io,userId, roomId) {
        const parts = roomId.split('-', 2)
        const roomIndex = parseInt(parts[1])
        console.log('parts', roomIndex)
        console.log(Rooms.roomArrId)
        let roomSocketId = Rooms.roomArrId[roomIndex - 1]
        console.log('la room actuelle est :',roomId , "et sa room socketID : ", roomSocketId)
        // socket.broadcast.to(roomSocketId).emit('bra', userId)
        io.to(`${roomSocketId}`).emit('tes', 'I just met you')
    }
}