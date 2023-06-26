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
    <div style={{
      backgroundColor:"lavender",
      border:"1px solid black",
      borderRadius:"0px 0px 20px 20px",
      width:"600px",
      padding:"10px 0px 30px 0px",
      margin:"30px auto",
      marginTop:"-31px"}}>
      
      <h3>Sign in with a username to join the server.</h3>
      
      <form onSubmit = {joinServer}>
        
        <label>Username: </label>
        
        <input style={{
          padding:"7px",
          borderRadius:"5px",
          border:"1px solid black"}}
          type='text'
          value={username}
          onChange = {(e) => setUsername(e.target.value)}/>

        <button style={{
          padding:"7px 20px", 
          margin:"0px 10px", 
          backgroundColor:"#2f76d2", 
          color:"white", 
          border:"1px solid black", 
          borderRadius:"5px", 
          cursor:"pointer"}}>
          JOIN</button>

      </form>

    </div>
  )
}

export default Chat