import React from "react";
import ActiveRooms from "../../components/ActiveRooms";
import SideMenu from "../../components/SideMenu";
import CreateRoomBtn from "../../components/CreateRoomButton";

import "./styles.scss";

const MainView = () => {

  return (
    <div className="container">
    
        <SideMenu className="sideBar" />
   
      <h1 className="pageHeader">Welcome to the chat app</h1>

      <div className="mainMenu">
    
        <ActiveRooms className="activeRooms" />
      </div>
    </div>
  );
};

export default MainView;
