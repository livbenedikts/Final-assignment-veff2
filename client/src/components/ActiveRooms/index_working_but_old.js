import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import io from 'socket.io-client';
import './styles.scss'
import { addSession } from '../../actions/sessionActions';
const socket = io.connect('http://localhost:8080');

const ActiveRooms = () => {
    const socket = useSelector(({socket}) => socket);
    const username = useSelector(({session}) => session);
    const [userList, setUserList] = useState([]);
    const [room, setRoom] = useState("");
    const [roomList, setRoomList] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    
    console.log("ég",username)
    useEffect(() => {
        // Get the list of available rooms when the component mounts
        socket.emit("rooms");
  
        // Get the list of connected users when the component mounts
        socket.emit("users");
        socket.on("userlist", (userlist) => {
            setUserList(userlist);
            
          });
    
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
        socket.off("userlist");
          console.log(room)
        }
      }, [socket]);
    

      const joinchatroom =(e) => {
        // create the joinObject
        socket.username=username;


   
        socket.emit("joinroom" ,{ room: e.name, username: socket.username}, (success) => {
            if (success) {
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

      console.log("User list:", userList);

    return (
        <div className='chatRooms' >
            <h3>Active Rooms</h3>
            <ul className="chatRoomLis">
                {roomList.map((e) => (
                    <div key={
                        e.name}>
                        <li className='singleRoom' key={e.name}>
                            <p id='roomName'>{e.name}</p>
                            <p id='roomTopic'> {e.topic}</p>
                            
                            <Button id='leaveBtn' variant="contained" onClick={() => leaveRoom(e)}>Leave</Button>
                            <Button id='joinBtn' variant="contained" onClick={() => joinchatroom(e)}>Join</Button>
                            <div id='roomUsers'>
                            {Object.values(e.users).map((user) => (
                                 <p key={user} id='names'>{user}  </p>
                            ))}
                            </div>
                        </li>
                    </div>))}
            </ul>
        </div>
    );
}

export default ActiveRooms;
