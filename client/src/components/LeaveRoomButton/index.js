import React from "react";
<<<<<<< HEAD
import { socket } from "../../socket";

const LeaveBtn = ({ room }) => {
  const handleLeave = () => {
    console.log(room);
    socket.emit("partroom", room);
  };

  return (
    <div>
      <button onClick={handleLeave}>Leave Room</button>
    </div>
  );
};

export default LeaveBtn;
=======
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
>>>>>>> ab105edfcfe26abb75377a010dd27da70b024b66
