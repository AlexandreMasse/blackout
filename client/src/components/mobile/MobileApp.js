import React, { Component } from 'react'
import { connect } from 'react-redux';
import io from 'socket.io-client'

//css
import './MobileApp.scss'

const socket = io.connect()

class MobileApp extends Component {
  constructor (props) {
    super(props)

    this.state = {
        room: 'hello',
        code: 'null'
    }
  }

  componentWillMount() {
    this.sendDeviceType()
    this.getCurrentRoom()
    this.checkUserConnection()
  }

  sendDeviceType = () => {
    console.log('mobile type')  
    socket.emit('deviceType',{
        type:'mobile'
    })
  }

  getCurrentRoom = () => {
    socket.on('connectToRoom',(data) => {
        console.log(data)
        this.setState({room : data})
     });
  }

  handleChange = (e) => {
    // console.log(e.target.value)
    const value = e.target.value 
    this.setState({
      code: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let code = this.state.code
    if(code !== null && code !== '') {
      console.log(code)
      socket.emit('sendCode', {
        key: code
      })
    } else {
      console.log('le code est vide')
    }
  }

  checkUserConnection = () => {
    socket.on('access',(data) => {
      console.log(data)
    })
  }

  render() {
    const { room } = this.state

    return (
      <div className="App App-Mobile">
        <header className="App-header">
          <p>
            Mobile - {room}
          </p>
          <form className="commentForm" onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleChange} value={this.state.code} />
            <input type="submit" value="Submit"/>
          </form>
        </header>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps,mapDispatchToProps)(MobileApp)

