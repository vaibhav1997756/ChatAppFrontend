

// // client/src/App.js
// import React, { useState, useEffect } from 'react';
// import socketIOClient from 'socket.io-client';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import Register from './components/Register';
// import Chat from './components/Chat';



// function App() {
 
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={ <Login/>} />
//         <Route path="/register" element={ <Register />} />

      
//         <Route path="/chat" element={  <Chat />} />
        
     
       
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Jaipuriya Chat Group</h3>
          <input
            type="text"
            placeholder="Name"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
