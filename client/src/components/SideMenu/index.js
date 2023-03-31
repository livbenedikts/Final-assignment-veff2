import React, { useState, useEffect } from "react";
import classNames from "classnames";
import "./styles.scss";
import { socket } from "../../socket";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateRoomBtn from "../CreateRoomButton";

const SideMenu = ({ className }) => {
  const menuClasses = classNames("sideBar", className);
  const [userList, setUserList] = useState([]);
  const username = useSelector((state) => state.session.username);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("users");

    socket.on("userlist", (userlist) => {
      console.log("User list:", userlist);
      setUserList(userlist);
    });

    return () => {
      socket.off("userlist");
    };
  }, []);

const toPrivateChat = (user) => {
    console.log("user", user);
    console.log("username", username);

   
      if (user != undefined && user != username) {
        console.log("receiver is ", user);
    
        console.log(user)
        // get the room object inside roomList that matches is newly joined room
        navigate(`/privatechat/${user}`);
      } else {
        console.log("fail");
      }
 
  };

  return (
    <div className={menuClasses}>
      <div className="activeUsers">
        <h3>Welcome, {username}</h3>
        <h4>Active Users </h4>

        <ul className="actUserLis">
          {userList.map((user) => (
            <button onClick={() => toPrivateChat(user)} key={user}>{user}</button>
          ))}
        </ul>
      </div>
      <div className="createRoomBtn">
      <CreateRoomBtn className="createRoomBtn" />
      </div>
    </div>
  );
};

export default SideMenu;
