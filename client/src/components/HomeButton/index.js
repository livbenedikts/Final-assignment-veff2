import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

const HomeButton = ({ className }) => {
  const menuClasses = classNames("homeBtn", className);
  const navigate = useNavigate();

  //send user back to active rooms
  const handleHome = () => {
    navigate("/activeRooms");
  };

  return (
    // inline style, float: right
    <div className="homeBtn">
      <Button variant="contained" color="primary" onClick={handleHome}>
        Back to Active Rooms
      </Button>
    </div>
  );
};

export default HomeButton;
