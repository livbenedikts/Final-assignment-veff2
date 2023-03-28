import React from "react";
import ActiveRooms from "../../components/ActiveRooms";
import SideMenu from "../../components/SideMenu";
import CreateRoomBtn from "../../components/CreateRoomButton";

import { useParams } from "react-router-dom";
import "./styles.scss";

const MainView = () => {
  const { id } = useParams();

  return (
    <div className="container">
      <div className="sideBar">
        <SideMenu className="sideMenu" />
      </div>

      <div className="mainMenu">
        <h1 className="pageHeader">Welcome to the chat app</h1>
        <CreateRoomBtn className="createRoomBtn" />
        <ActiveRooms className="activeRooms" />
      </div>
    </div>
  );
};

export default MainView;
