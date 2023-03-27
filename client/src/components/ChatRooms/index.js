import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import io from 'socket.io-client';
import './styles.scss'
import { addSession } from '../../actions/sessionActions';
const socket = io.connect('http://localhost:8080');


const ChatRooms = () => {
    
    const socket = useSelector(({socket}) => socket);
    const username = useSelector(({session}) => session.username);
    const roomfromserver = useSelector(({session}) => session.rooms);
    const [room, setRoom] = useState("");
    const [roomList, setRoomList] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();


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
       

      const joinRoom = (e) => {
        console.log('do i go in here')
    
        socket.emit('joinroom', {room: e.name, pass: "" }, (success) => {
            if (success) {
                console.log('fer ég hér í chatrooms?');

                console.log("nei bæææj",e.name)
                dispatch(addSession(e.name))

                navigate('/chat', { state: { room: e.name } });
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

        



    return (
        <div className='chatRooms' >
            <h3>Active Rooms</h3>
            <ul className="chatRoomLis">
                {roomList.map((e) => (
    
                    
                    <div >
                        <li className='singleRoom' key={e.name}>
                            <p id='roomName'>{e.name}</p>
                            <p id='roomTopic'> {e.topic}</p>
                            
                            <Button id='leaveBtn' variant="contained" onClick={() => leaveRoom(e)}>Leave</Button>
                            <Button id='joinBtn' variant="contained" onClick={() => joinRoom(e)}>Join</Button>
                            <div id='roomUsers'>
                            {Object.values(e.users).map((user) => (
                                 <p key={user} id='names'>{user}  </p>
                            ))}
                            </div>
                          
                        </li>
                    </div>
                ))}
            </ul>
         
        </div>
    );
}

export default ChatRooms;