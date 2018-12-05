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

    createUsersPassword(roomId, socket) {
        let player1 = this.createPassword()
        let player2 = this.createPassword()
        Password.activePasswordObj[ player1 ] = `${roomId}_player1`
        Password.activePasswordObj[ player2 ] = `${roomId}_player2`
  
        socket.emit('createRoom', {
          roomId: roomId, 
          password1: player1,
          password2: player2,
        })
        console.log(Password.activePasswordObj)
      }
}