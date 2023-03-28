import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import io from 'socket.io-client';
import './styles.scss'
import { useLocation } from 'react-router-dom';
const socket = io.connect('http://localhost:8080');


const ActiveRooms = ({className}) => {
    const menuClasses = classNames('activeRooms', className);
    
    const socket = useSelector(({socket}) => socket);
    const [room, setRoom] = useState("");
    const [roomList, setRoomList] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { username } = location.state;



    useEffect(() => {
        // Get the list of available rooms when the component mounts
        socket.emit("rooms");
  
        // Get the list of connected users when the component mounts
        socket.emit("users");
    
        // Listen for updates to the list of available rooms
        socket.on("roomlist", (room) => {
            setRoomList(
              Object.entries(room).map (([key, value]) =>  (
                  {
                      name: key,
                      ...value,
                  })
              ))
        });
     
        return () => {
          socket.off("roomlist");
          console.log(room)
        }
      }, [socket]);
       
      console.log(roomList)
      const joinRoom = (e) => {
       
    
        socket.emit('joinroom', {room: e.name, pass: "" }, (success) => {
            if (success) {
               
              
                var room = e;
                // console.log(room)
                // console.log(username)

                navigate('/chat', { state: { username,room } });
            } else {
                console.log('fail');}
        })
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

      console.log(username)

        

    return (
        <div className={menuClasses}>
            <h3>Active Rooms</h3>
            <ul className="chatRoomLis">
                {roomList.map((e) => (

                    <li key={e.name}>
                    <button className="custom-button"  color="primary" onClick={() => joinRoom(e)}>{e.name}
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


