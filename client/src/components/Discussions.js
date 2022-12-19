import React, { useState, } from "react";
import { Link } from "react-router-dom";
import "../Discussions.css";

function Discussions() {

    const [roomName, setRoomName ] = useState("");
    const handleRoomChange = (e) => {
        setRoomName(e.target.value);
    }

    return(
        <div className="home-container">
            <h1>This is socket.io Discussions tab</h1>
            <input type="text" value={roomName} placeholder="search Room" onChange={handleRoomChange} className="text-input-field"/>
            <br />
            <Link to={`/discussions/${roomName}`} className="enter-room-button">Join!</Link>
        </div>
    )
}

export default Discussions;
