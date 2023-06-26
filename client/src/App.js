import './App.css';
import io from 'socket.io-client'
import React, {useState, useEffect} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Chat from './components/Chat'
import Homepage from './components/Homepage';

function App() {
  
  const [socket] = useState(() => io(':8000'))
  const [username, setUsername] = useState('')
  const [isConnected, setIsConnected] = useState(socket.connected)
  
  useEffect(() => {
    console.log('Is this thing running?')
    socket.on('connect', () => {
      setIsConnected(true)
    })
    return () => {
      socket.disconnect(true)
    }}, [])
  
  
  return (
    <div className="App">
      <BrowserRouter>
      <h1>Fun Times Chat!</h1>
        <Routes>
          <Route path='/' element={<Chat socket={socket} username={username} setUsername={setUsername}/>}/>
          <Route path='/homepage' element={<Homepage socket={socket} username={username} setUsername={setUsername}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
