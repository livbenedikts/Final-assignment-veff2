import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LeaveBtn from "../LeaveRoomButton";
import "./styles.scss";
import { socket } from "../../socket";
import { useParams } from "react-router-dom";

const MessageHistory = () => {
  const username = useSelector((state) => state.session.username);
  const [message, setMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);
  const { roomName } = useParams();

  useEffect(() => {
    // listin for updates of the message history
    socket.on("updatechat", (room, data) => {
      console.log("updatechat", room, data);
    });

    // get list of users in the room
    socket.on("updateusers", (room, users, roomOps) => {});

    socket.on("onjoin", (room, username) => {
      // setRoom(room);
      console.log("onjoin", room, username);
    });
    return () => {
      socket.off("updatechat");
      socket.off("updateusers");
      socket.off("onjoin");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    const data = {
      roomName,
      message: {
        user: username,
        timestamp: new Date().toLocaleString(),
        message: message.substring(0, 200),
      },
    };
    socket.emit("sendmsg", {
      username: username,
      roomName: roomName,
      msg: message,
    });
    setMessageHistory([...messageHistory, data.message]);
    setMessage("");
  };

  return (
    <div className="chat">
      <h1>
        Welcome to {roomName}, {username}
      </h1>
      <LeaveBtn roomID={roomName} />
      <div className="msgHistoryContainer">
        {messageHistory.map((message) => (
          <div key={message.timestamp} className="singleMsg">
            <span className="timestamp">{message.timestamp}</span>
            <span className="nick">{message.nick} </span>
            <span className="message">{message.message}</span>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="messageInput">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default MessageHistory;
