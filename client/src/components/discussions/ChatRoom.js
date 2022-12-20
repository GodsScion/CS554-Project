import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./ChatRoom.css";
import useChat from "../../useChat";

function ChatRoom() {
  const { roomId } = useParams();
  const location = useLocation();
  var userName = "";
  if (location.state === null) {
    userName = "Anonymous";
  } else {
    const { username } = location.state;
    userName = username;
  }
  const { messages, sendMessage } = useChat(roomId, userName);
  const [newMessage, setNewMessage] = useState("");

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };
  return (
    <div className="chat-room-container">
      <h1 className="room-name">
        Room: {roomId}, Joined as: {userName}
      </h1>
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${
                message.ownedByCurrentUser ? "my-message" : "received-message"
              }`}
            >
              {message.userName}:{message.body}
            </li>
          ))}
        </ol>
      </div>
      {/* <p>{userName}</p> */}
      <label htmlFor="my-input3"></label>
      <textarea
        id="my-input3"
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
    </div>
  );
}

export default ChatRoom;
