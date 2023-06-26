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
    <div style={{
        backgroundColor:"lavender",
        border:"1px solid black",
        borderRadius:"0px 0px 20px 20px",
        width:"600px",
        padding:"10px 0px 30px 0px",
        margin:"30px auto",
        marginTop:"-31px"}}>

        <p style={{
            fontWeight:"bold"}}>
            USERS IN THE CHAT:</p>

        {users.map((user) => (
            <p key={user.id}>
            Username: {user.username}</p>
            ))}

        <hr style={{margin:"30px"}}/>

        <form onSubmit = {sendMessage}>
            
            <input style={{
                padding:"7px",
                borderRadius:"5px",
                border:"1px solid black",
                width:"300px"}}
                type='text'
                value={input}
                onChange = {(e) => setInput(e.target.value)}/>

            <button style={{
                padding:"7px 20px", 
                margin:"0px 10px", 
                backgroundColor:"#2f76d2", 
                color:"white", 
                border:"1px solid black", 
                borderRadius:"5px", 
                cursor:"pointer"}}>
                SEND MESSAGE</button>

        </form>

        <hr style={{margin:"30px"}}/>
        
        {messages.map((message) => (
            <div style={{padding:"10px"}}>{message.username}: "{message.message}"</div>   
            ))}

        </div>
    )
}  

export default Homepage