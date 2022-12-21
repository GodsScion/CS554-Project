import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Discussions.css";

function Mediator() {
  const [userName, setUserName] = useState("");
  const { roomName } = useParams();
  const handleUserChange = (e) => {
    setUserName(e.target.value);
  };

  let rn = roomName
  return (
    <div className="home-container">
      <label htmlFor="myinput1"></label>
      <input
        id="myinput1"
        type="text"
        value={userName}
        onChange={handleUserChange}
        className="text-input-field"
        placeholder="chat as ..."
      />
      <Link to={`/discussions/${rn.replace(/\s/g, '')}`} className="enter-room-button" state={{username: userName}}>Join!</Link>
    </div>
  );
}

export default Mediator;
