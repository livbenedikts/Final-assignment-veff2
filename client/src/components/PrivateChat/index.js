import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LeaveBtn from "../LeaveRoomButton";
// import RoomUsers from "../../components/RoomUsers";
import "./styles.scss";
import { socket } from "../../socket";
import { useParams } from "react-router-dom";



const PrivateChat = () => {
  const username = useSelector((state) => state.session.username);
  const [message, setMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);
  const { roomName } = useParams();
  const [roomUsers, setRoomUsers] = useState([]);
  const [room, setRoom]= useState([]);

  useEffect(() => {
    socket.emit("rooms");

    // Get the list of connected users when the component mounts
    socket.emit("users");
    // listin for updates of the message history
    socket.on("updatechat", (room, data) => {
      setMessageHistory(data);
    });


    // get list of users in the room
    socket.on("updateusers", (room, username, roomOps) => {
        console.log("updateusers ég", room, username, roomOps);
        setRoomUsers(username);
    });

    socket.on("roomlist", (room) => {
        setRoom(
          Object.entries(room).map(([key, value]) => ( {
            name: key,
            ...value,
          }))
        );
        console.log(room[roomName])
      });

    socket.on("onjoin", (room, username) => {
      console.log("onjoin", room, username);
    });
    return () => {
      socket.off("updatechat");
      socket.off("updateusers");
      socket.off("onjoin");
      socket.off("roomlist")
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
    setMessage("");
    
  };

 
  return (
    <div className="chat">
      <div className="msgWrapper">
        <div className="msgHistoryContainer">
            <p>hælllll</p>
          {messageHistory.map((message) => (
            <div key={message.timestamp} className={`singleMsg ${message.nick === username ? "sent" : "received"}`}>
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

      </div>
    
      
  );
};

export default PrivateChat;
