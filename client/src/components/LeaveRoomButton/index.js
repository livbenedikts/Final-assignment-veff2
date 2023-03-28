import React from "react";
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
