import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { socket } from "../../socket";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";



const LeaveBtn = ({ className }) => {
    const menuClasses = classNames("leaveBtn", className);
    const username = useSelector((state) => state.session.username);
    const { roomName } = useParams();
    const navigate = useNavigate();
      
  const handleLeave = () => {
    username && socket.emit("partroom", roomName);
    <alert>You have left {roomName}</alert>
    navigate("/activeRooms");
  };

  return (
    <div className="leaveBtn">
      <Button variant="contained" color="primary" onClick={handleLeave}>
        Leave group
      </Button>
    </div>
  );
};


export default LeaveBtn;
