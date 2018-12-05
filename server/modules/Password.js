let minPassword = 1000
let maxPassword = 9999
let passwordArr = []
let activePasswordObj = {}
for (var i = minPassword; i <= maxPassword; i++) {
  passwordArr.push(i)
}

export default class Password {
    static passwordArr = passwordArr
    static activePasswordObj = activePasswordObj

    constructor() {
    }
    // static addPassword() {
    //     passwordArr.pus
    // }

    createPassword() {
        let code = Password.passwordArr.splice(Math.floor(Password.passwordArr.length*Math.random()), 1)
        // let code = passwordArr.splice(Math.floor(passwordArr.length*Math.random()), 1)
        console.log(code)
        return code.length ? code[0] : null
    }

    createUsersPassword(roomName, socket) {
        let player1 = this.createPassword()
        let player2 = this.createPassword()
        Password.activePasswordObj[ player1 ] = `${roomName}_player1`
        Password.activePasswordObj[ player2 ] = `${roomName}_player2`
  
        socket.emit('setCode', { 
          code1: player1,
          code2: player2,
        })
        console.log(Password.activePasswordObj)
      }
}