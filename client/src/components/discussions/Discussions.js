import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Discussions.css";

import { BE_URL } from '../../enums';
function Discussions() {
  const [roomName, setRoomName] = useState("");
  const [userName, setUserName] = useState("");
  const [happy, setHappy] = useState(true);
  const [availableRooms, setAvailableRooms] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`${BE_URL}/courses`);
      setAvailableRooms(data.data);
    };
    fetchData()
  }, []);

  const handleRoomChange = (e) => {
    setRoomName(e.target.value);
  };

  const handleUserChange = (e) => {
    setUserName(e.target.value);
  };

  function createRoom() {
    setHappy(!happy);
  }

  function addRoom(roomName) {
    // setAvailableRoom(availableRooms.push(roomName));
    // console.log(availableRooms);
    availableRooms.push(roomName);
    console.log(availableRooms);
  }

  const navigate = useNavigate();

  return (
    <div className="container position-absolute top-50 start-50 translate-middle col-md-5 col-lg-5 col-sm-10 bg-body rounded mt-2 p-3">
      <h1 className="mb-3">Available Rooms:</h1>
      <ul className="list-group">
        {availableRooms.map((room, index) => {
          return (
              <li key={index} className="list-group-item list-group-item-dark list-group-item-action rounded mb-1" onClick={()=>{navigate(`/mediator/${room.name}`)}}>{room.name}</li>
          );
        })}
      </ul>
      {/* <h2>You can create a different room</h2>
      <h3>If you don't want to join the above rooms:</h3>
      <button onClick={createRoom}>create room!</button> */}
    </div>
  );

  // if (happy === true) {
  //   return (
  //     <div className="home-container-main">
  //       <h1>Available Rooms:</h1>
  //       <ul>
  //         {availableRooms.map((room, index) => {
  //           return (
  //             <Link key={index} to={`/discussions/${room.name}`}>
  //               <li className="yellow-text">{room.name}</li>
  //             </Link>
  //           );
  //         })}
  //       </ul>
  //       <h2>You can create a different room</h2>
  //       <h3>If you don't want to join the above rooms:</h3>
  //       <button onClick={createRoom}>create room!</button>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div className="home-container">
  //       {/* <h2>If you didn't find your desired room, Create your own rooms:</h2> */}
  //       <label htmlFor="myinput1"></label>
  //       <input
  //         id="myinput1"
  //         type="text"
  //         value={userName}
  //         onChange={handleUserChange}
  //         className="text-input-field"
  //         placeholder="chat as ..."
  //       />
  //       <label htmlFor="myinput2"></label>
  //       <input
  //         id="myinput2"
  //         type="text"
  //         value={roomName}
  //         placeholder="search Room"
  //         onChange={handleRoomChange}
  //         className="text-input-field"
  //       />
  //       <br />
  //       <Link
  //         to={`/discussions/${roomName}`}
  //         className="enter-room-button"
  //         state={{ username: userName }}
  //         onClick={addRoom(roomName)}
  //       >
  //         Join!
  //       </Link>
  //       <button onClick={createRoom} className="enter-room-button">
  //         Go back to availableRooms
  //       </button>
  //     </div>
  //   );
  // }

  // return(
  //     <div className="home-container">
  //     <div>
  //         <h1>Available Rooms:</h1>
  //         <ul>
  //             {availableRooms.map((room,index) => {
  //                 return(<Link to={`discussions/${room}`}><li key={index}>{room}</li></Link>)
  //             })}
  //         </ul>
  //     </div>
  //         <h2>If you didn't find your desired room, Create your own rooms:</h2>
  //         <label htmlFor="myinput1"></label>
  //         <input id = "myinput1" type="text" value={userName} onChange={handleUserChange} className="text-input-field" placeholder="chat as ..."/>
  //         <label htmlFor="myinput2"></label>
  //         <input id = "myinput2" type="text" value={roomName} placeholder="search Room" onChange={handleRoomChange} className="text-input-field"/>
  //         <br />
  //         <Link to={`/discussions/${roomName}`} className="enter-room-button" state={{username: userName}}>Join!</Link>
  //     </div>
  // )
}

export default Discussions;
