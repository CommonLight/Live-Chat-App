import React, {useState, useEffect} from 'react'

const Homepage = (props) => {
  
    const {socket, username, setUsername} = props
    const [users, setUsers] = useState([])
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
  
    useEffect (() => {
        socket.on('new-user-joined', data => {
            console.log(data)
            setUsers(data)
        })
        socket.on('send-message-to-all-clients', data => {
            setMessages((prevMessages) => [...prevMessages, data])
        })
    }, [])

    const sendMessage = (e) => {
        e.preventDefault()
        socket.emit('send-message', {message:input, username: username})
        setInput('')
    }

    return (
    <div>
        <p>--------------------------------------------------------------</p>
        <p style={{fontWeight:"bold"}}>USERS IN THE CHAT:</p>
        {users.map((user) => (
            <p key={user.id}>Username: {user.username}</p>
        ))
        }
        <p>--------------------------------------------------------------</p>
        <form onSubmit = {sendMessage}>
            <label>Message: </label>
            <input type='text' value={input} onChange = {(e) => setInput(e.target.value)}/>
            <button style={{padding:"1px 10px", margin:"0px 10px"}}>Send Message</button>
        </form>
        <p>--------------------------------------------------------------</p>
        {
            messages.map((message) => (
            <div>{message.username} Says: {message.message}</div>   
            ))
        }
        </div>
    )
}  

export default Homepage