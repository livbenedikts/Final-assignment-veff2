import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import LeaveBtn from '../LeaveRoomButton';
import './styles.scss';
const socket = io.connect('http://localhost:8080');

const MessageHistory = () => {
    const username = useSelector((session) => session.session);
    const [message, setMessage] = useState("");
    const [messageHistory, setMessageHistory] = useState([]);
    const [historyLoaded, setHistoryLoaded] = useState(false);
    const location = useLocation();
    const roomName = location.state.roomName;
    socket.username = username

    useEffect(() => {

        socket.on("onjoin", (room, username) => {
            // Request chat history when user joins room
            socket.emit("getchat", { roomName: roomName });
            console.log("onjoin", room, username);
          });

        
        // listin for updates of the message history
        socket.on("updatechat", (room, data) => {
            //add key to message
            // add message to message history

            setMessageHistory([...messageHistory, data]);
            setHistoryLoaded(true);

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
        }
    }, [socket]);


    const sendMessage = (e) => {

        e.preventDefault();
        
        const data = {
            roomName,
            message: {
                username: socket.username,
                timestamp: new Date().toLocaleString(),
                message: message.substring(0, 200),
            }
        }
        console.log(data)
        socket.emit("sendmsg", { username: socket.username, roomName: roomName, msg: message, timestamp: new Date().toLocaleString() })
        // setMessageHistory([...messageHistory, data.message])
        setMessage('');
        console.log("virka ég",messageHistory)
      };

    //   {messageHistory.map((message) => (
    //     console.log(message)))
       

    // }
    console.log("messageHistory", messageHistory)

    return (
            <div className="chat">
                <h1>Welcome to {roomName}, {username}</h1>
                <LeaveBtn roomID={roomName} />
                <div className="msgHistoryContainer">
                    {messageHistory.flatMap((messages, index) =>
                        messages.map((message) => (
                        <div key={message.timestamp + index} className={`singleMsg ${message.nick === username ? 'sent' : 'received'}`}>
                            <span className="timestamp">{message.timestamp.substring(11, 16)}</span>
                            <span className="nick">{message.nick} </span>
                            <span className="message">{message.message}</span>
                        </div>
                        ))
                    )}
                    </div>
                <form onSubmit={sendMessage} className="messageInput">
                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button type="submit" onClick={sendMessage}>Send</button>
                </form>       
        </div>
    );
}

export default MessageHistory;