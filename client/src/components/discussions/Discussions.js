import React, { useState, } from "react";
import { Link } from "react-router-dom";
import "./Discussions.css";

function Discussions() {

    const [roomName, setRoomName ] = useState("");
    const [userName, setUserName] = useState("");
    const handleRoomChange = (e) => {
        setRoomName(e.target.value);
    }

    const handleUserChange = (e) => {
        setUserName(e.target.value);
    }

    return(
        <div className="home-container">
            <p>This is socket.io Discussions tab</p>
            <input type="text" value={userName} onChange={handleUserChange} className="text-input-field" placeholder="chat as ..."/>
            <input type="text" value={roomName} placeholder="search Room" onChange={handleRoomChange} className="text-input-field"/>
            <br />
            <Link to={`/discussions/${roomName}`} className="enter-room-button" state={{username: userName}}>Join!</Link>
        </div>
    )
}

export default Discussions;
