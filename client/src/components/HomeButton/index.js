import React from "react";
<<<<<<< HEAD
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
    <div>
      <Button variant="contained" color="primary" onClick={handleHome}>
        Back to Active Rooms
      </Button>
    </div>
  );
};

export default HomeButton;
=======
import { Button} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:8080');


const HomeButton = ({ className }) => {
    const menuClasses = classNames('homeBtn', className);
    const navigate = useNavigate();
    const location = useLocation();
    const { username, room } = location.state;

    console.log("from home button ",username, room)


    //send user back to active rooms
    const handleHome = () => {
        navigate('/activeRooms', { state: { username } });  
    }



    return (
        // inline style, float: right
        <div  >
            <Button variant="contained" color="primary" onClick={handleHome}>
                Back to Active Rooms
            </Button>
        </div>
    );
}

export default HomeButton;
>>>>>>> ab105edfcfe26abb75377a010dd27da70b024b66
