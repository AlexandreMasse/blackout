let minPassword = 1000
let maxPassword = 9999
let passwordArr = []
for (var i = minPassword; i <= maxPassword; i++) {
  passwordArr.push(i)
}

export default class Password {
    static passwordArr = passwordArr

    constructor() {
        this.init()
    }

    init() {
        this.passwordArr = []
        this.activePasswordObj = {}
    }

    createPassword() {
        let code = Password.passwordArr.splice(Math.floor(Password.passwordArr.length*Math.random()), 1)
        console.log(code)
        return code.length ? code[0] : null
    }

    createUsersPassword(roomName, socket) {
        let player1 = this.createPassword()
        let player2 = this.createPassword()
        this.activePasswordObj[ player1 ] = `${roomName}_player1`
        this.activePasswordObj[ player2 ] = `${roomName}_player2`
  
        socket.emit('setCode', { 
          code1: player1,
          code2: player2,
        })
        console.log(this.activePasswordObj)
      }
}