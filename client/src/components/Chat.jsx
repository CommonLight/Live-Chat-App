import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const Chat = (props) => {

  const {socket, username, setUsername} = props
  const navigate = useNavigate()

  const joinServer = (e) => {
    e.preventDefault()
    socket.emit('join-server', username)
    navigate('/homepage')
  }

  return (
    <div>
      <h3>Sign in with a username to join the server.</h3>
      <form onSubmit = {joinServer}>
        <label>Username: </label>
        <input type='text' value={username} onChange = {(e) => setUsername(e.target.value)}/>
        <button style={{padding:"1px 10px", margin:"0px 10px"}}>Join</button>
      </form>
    </div>
  )
}

export default Chat