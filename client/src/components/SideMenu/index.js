import React, { useState, useEffect } from "react";
import classNames from "classnames";
import "./new_styles.scss";
import { socket } from "../../socket";
import { useSelector } from "react-redux";

const SideMenu = ({ className }) => {
  const menuClasses = classNames("side-menu", className);
  const [userList, setUserList] = useState([]);
  const username = useSelector((state) => state.session.username);

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

  return (
    <div id="side-menu" className={menuClasses}>
      <div className="activeUsers">
        <h3>Welcome, {username}</h3>
        <h4>Active Users </h4>

        <ul className="actUserLis">
          {userList.map((user) => (
            <li key={user}>{user}</li>
          ))}
        </ul>
        <p>Implement user's rooms</p>
      </div>
    </div>
  );
};

export default SideMenu;
