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
        Object.entries(room).map(([key, value]) => ({
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
        navigate(`/chat/${room.name}`);
      } else {
        console.log("fail");
      }
    });
  };

  const leaveRoom = (e) => {
    e.preventDefault();
    if (username && room) {
      // Leave the selected room
      socket.emit("leaveroom", { username, room }, (success) => {
        if (success) {
          setMessage(`Left room ${room}`);
        } else {
          setMessage(`Unable to leave room ${room}`);
        }
      });
    }
  };

  console.log(username);

  return (
    <div className={menuClasses}>
      <h3>Active Rooms</h3>
      <ul className="chatRoomLis">
        {roomList.map((e) => (
          <li key={e.name}>
            <button
              className="custom-button"
              color="primary"
              onClick={() => joinRoom(e)}
            >
              {e.name}
              {Object.values(e.users).map((user) => (
                <p id="usersInRoom" key={user}>
                  {user}
                </p>
              ))}
            </button>

            {/* <Button onClick={() => leaveRoom(e)}>Leave</Button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveRooms;
