import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import { socket } from "../../socket";
import { useSelector } from "react-redux";

const ActiveRooms = ({ className }) => {
  const menuClasses = classNames("activeRooms", className);
  const [room, setRoom] = useState("");
  const [roomList, setRoomList] = useState([]);
  const [message, setMessage] = useState("");
  const [roomUsers, setRoomUsers] = useState([]);
  const [roomOps, setRoomOps] = useState([]);
  const navigate = useNavigate();
  const username = useSelector((state) => state.session.username);

  useEffect(() => {
    // Get the list of available rooms when the component mounts
    socket.emit("rooms");

    // Get the list of connected users when the component mounts
    socket.emit("users");


    // Listen for updates to the list of available rooms
    socket.on("roomlist", (room) => {
      setRoomList(
        Object.entries(room).map(([key, value]) => ( {
          name: key,
          ...value,
        }))
      );
    });

    return () => {
      socket.off("roomlist");
    };
  }, []);


  const joinRoom = (room) => {
    socket.emit("joinroom", { room: room.name, pass: "" }, (success) => {
      if (success) {
        console.log("updateusers from join inside ActiveRooms", username);
        setRoomUsers(username);
        // get the room object inside roomList that matches is newly joined room
        navigate(`/chat/${room.name}`);
      } else {
        console.log("fail");
      }
    });
  };

  return (
    <div className="activeRooms">
      <h2>Active Rooms</h2>
      <p id="actRoomText">Click on a room to join!</p>
      <ul className="chatRoomLis">
        {roomList.map((e) => (
          <li key={e.name}>
            <button
              className="custom-button"
              color="primary"
              onClick={() => joinRoom(e)}
            >
              {e.name}
              <ul id="usersInRoom">
              {Object.values(e.users).map((user) => (
                <p id="user" key={user}>
                  {user}
                </p>
              ))}
              </ul>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveRooms;
