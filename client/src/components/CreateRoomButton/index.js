import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import classNames from "classnames";
import { useSelector } from "react-redux";

const CreateRoomBtn = ({ className }) => {
  const menuClasses = classNames("createRoomBtn", className);
  const username = useSelector((state) => state.session.username);
  const navigate = useNavigate();

  const gotoCreateRoom = (e) => {
    e.preventDefault();
    // socket.username = username;
    navigate("/createRoom", { state: { username } });
  };

  return (
    <div className={menuClasses}>
      <Button variant="contained" onClick={gotoCreateRoom}>
        Create Room
      </Button>
    </div>
  );
};

export default CreateRoomBtn;
