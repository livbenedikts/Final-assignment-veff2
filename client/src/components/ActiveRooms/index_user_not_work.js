import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import './styles.scss'
import { useLocation } from 'react-router-dom';
const socket = io.connect('http://localhost:8080');

const ActiveRooms = ({className}) => {
    const menuClasses = classNames('activeRooms', className);
    // const socket = useSelector(({socket}) => socket);
    const user = useSelector((session) => session);

    const [room, setRoom] = useState("");
    const [roomList, setRoomList] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { username } = location.state;

    console.log(socket)
    console.log("kem ég frá statinu?",user)


    useEffect(() => {
        socket.emit("rooms");
        socket.emit("users");
    
        // Listen for updates to the list of available rooms
        socket.on("roomlist", (room) => {
            setRoomList(
              Object.entries(room).map (([key, value]) =>  (
                  { name: key,
                      ...value,})
              ))
        });  
        return () => {
            socket.off("roomlist");
             console.log(room)
        }
      }, [socket]);

    //   const joinRoom = (e) => {
    //     // socket.emit('joinroom', {room: e.name, pass: "" }, (success) => {
    //         socket.emit("joinroom", { room: e.name, pass: undefined, user: username }, function (success) {
    //         if (success) {  
    //             var room = e;
    //             navigate('/chat', { state: { username,room } });
    //         } else {
    //             console.log('fail');}
    //     })
    // };


    const joinchatroom =(e) => {
        socket.username=username;

        
        socket.emit("joinroom" ,{room: e.name, username:socket.username }, (success) => {
            if (success) {
                console.log('success');
                const roomName = e.name;
                navigate('/chat', { state: { roomName } });
    
            } else {
                console.log('fail');}
        })
    }

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

    return (
        <div className={menuClasses}>
            <h3>Active Rooms</h3>
            <ul className="chatRoomLis">
                {roomList.map((e) => (
                    <li key={e.name}>
                    <button className="custom-button"  color="primary" onClick={() => joinchatroom(e)}>{e.name}
                            {Object.values(e.users).map((user) => (
                                <p id='usersInRoom' key={user}>{user}</p>
                            ))}
                    </button>
                    {/* <Button onClick={() => leaveRoom(e)}>Leave</Button> */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ActiveRooms;


