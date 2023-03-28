import React from "react";
import io from "socket.io-client";
const socket = io.connect('http://localhost:8080');


const LeaveBtn = ({room}) => {
    
        const handleLeave = () => {
                console.log(room)
            socket.emit("partroom", room);
        }
    
        return (
            <div>
                <button onClick={handleLeave}>Leave Room</button>
            </div>
        );
    }

 export default LeaveBtn;