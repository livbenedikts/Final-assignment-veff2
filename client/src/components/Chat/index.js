import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./styles2.scss";
import { socket } from "../../socket";
import { useParams } from "react-router-dom";

const Chat = () => {
    const username = useSelector((state) => state.session.username);
    const [message, setMessage] = useState("");
    const [messageHistory, setMessageHistory] = useState([]);
    const { roomName } = useParams();
    const [room, setRoom]= useState([]);
    const [roomObj, setRoomObj] = useState([]);
    const [groupMembers, setGroupMembers] = useState([]);
    const [isOp, setIsOp] = useState(false);
  
    useEffect(() => {
        socket.emit("rooms");
        socket.emit("users");

        // listin for updates of the message history
        socket.on("updatechat", (room, data) => {setMessageHistory(data);});

        // get list of users in the room
        socket.emit("updateusers", (room, username, roomOps) => {
            setGroupMembers(username);
        });

        socket.on("roomlist", (room) => {
        setRoom(
          Object.entries(room).map(([key, value]) => ( {
            name: key,
            ...value,
          }))
        );
        setRoomObj(room[roomName])
        setGroupMembers(room[roomName].users)
        console.log(room[roomName].ops)
        setGroupMembers(room[roomName].users)
        console.log(room.ops)
        if (room[roomName].ops !== undefined) {
          setIsOp(Object.values(room[roomName].ops).includes(username));
          console.log(Object.values(room[roomName].ops).includes(username))
          }

    });

    socket.on("onjoin", (room, username) => {setRoom(room)});
    
    return () => {
        socket.off("updatechat");
        socket.off("updateusers");
        socket.off("onjoin");
        socket.off("roomlist")
    };
  }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(message.split(" ")[2])
        console.log(groupMembers[message.split(" ")[2]])
        if (message.split(" ")[0] === "op" && message.split(" ")[1] === "-m" && isOp === true) {
            if (Object.values(groupMembers).includes(message.split(" ")[2])) {
                var opObj = {
                    room: roomName,
                    user: message.split(" ")[2]
                }
                socket.emit("op", {room: opObj.room, user: opObj.user}, (success) => {
                    if (success) {
                        alert("User is now op " + message.split(" ")[2]);
                    } else {
                        alert("User is not op " + message.split(" ")[2]);
                    }
                });

                    
            } else {
                alert("User does not exist");
            }
        } else if (message.split(" ")[0] === "op" && message.split(" ")[1] === "-r" && isOp === true) {
            if (Object.values(groupMembers).includes(message.split(" ")[2])) {
                var opObj = {
                    room: roomName,
                    user: message.split(" ")[2]
                }
                socket.emit("deop", {room: opObj.room, user: opObj.user}, (success) => {
                    if (success) {
                        alert("User is no longer op " + message.split(" ")[2]);
                    } else {
                        alert("User is still op " + message.split(" ")[2]);
                    }
                });

            } else {
                alert("User does not exist");
            }
        } else if (message.split(" ")[0] === "kick" && message.split(" ")[1] === "-m" && isOp === true) {

            if (Object.values(groupMembers).includes(message.split(" ")[2])) {
                var kickObj = {
                    room: roomName,
                    user: message.split(" ")[2]
                }
                socket.emit("kick", {room: kickObj.room, user: kickObj.user}, (success) => {
                    if (success) {
                        alert("User is kicked " + message.split(" ")[2]);
                    } else {
                        alert("User is not kicked " + message.split(" ")[2]);
                    }
                });

            } else {
                alert("User does not exist");
            }
        
        };
            
        const data = {
            roomName,
            message: {user: username, timestamp: new Date().toLocaleString(), message: message.substring(0, 200),},
            };
        socket.emit("sendmsg", {
            username: username,
            roomName: roomName,
            msg: message,
        });
        setMessage("");
  };
  
  
  
 
  return (
  <div className="chatRoom">
    <div className="msgWrapper">
        <div className="msgHistoryContainer">
            {messageHistory.map((message) => (
            <div key={message.timestamp} className={`singleMsg ${message.nick === username ? "sent" : "received"}`}>
                <span className="timestamp">{message.timestamp}</span>
                <span className="nick">{message.nick} </span>
                <span className="message">{message.message}</span>
            </div>
            ))}
        </div>
    </div>
    
    <div className="messageInput">
        <form onSubmit={sendMessage}>
            <input id="input" type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
            <button type="submit">Send</button>
        </form>
    </div>
    <div className="actionCommands">
        <h3>Possible Actions</h3>
        <p>You can achieve multiple things by typing these commands in the input box</p>
        <ul>
            <li>op -m <span>username</span>
            <span id="description">(Make another user op)</span></li>
            <li>unop -m <span>username</span>
            <span id="description">(Undo making another user op)</span></li>
            <li>kick -m <span>username</span>
            <span id="description">(Kick a user from the room)</span></li>
        </ul>
        <p>If the commands above do not work, try going back to active rooms and join the room again</p>
    </div>
   
 
    
    </div>  
  );
};

export default Chat;
