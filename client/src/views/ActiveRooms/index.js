import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.scss';
import io from 'socket.io-client';
import { Demo, List, ListItem, ListItemText, Typography, Divider, Box, TextField, Button } from '@mui/material';

import ChatRooms from '../../components/ChatRooms';
import SideMenu from '../../components/SideMenu';
import CreateRoom from '../../components/CreateRoom';
import { useSelector, useDispatch } from 'react-redux';
import { addSession } from '../../actions/sessionActions';



const socket = io.connect('http://localhost:8080');

const ActiveRooms = () => {
    const user = useSelector((session) => session);
    const socket1 = useSelector(({socket}) => socket);
    // const socket = useSelector(({socket}) => socket);
    const [room, setRoom] = useState("");

    const [roomList, setRoomList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const getuser = useSelector((session) => session);


    console.log("kem ég frá statinu?",user)
    
   
    useEffect(() => {
      // Get the list of available rooms when the component mounts
      socket.emit("rooms");

      // Get the list of connected users when the component mounts
      socket.emit("users");
  
      // Listen for updates to the list of available rooms
      socket.on("roomlist", (rooms) => {
        setRoom(
            Object.entries(rooms).map (([key, value]) =>  (
                {
                    name: key,
                    ...value,
                })
            ))
       
      });
      
      return () => {
        
        socket.off("roomlist");
        
      }
    }, [socket]);

 
    // const joinRoom = (e) => {
    //     dispatch(addSession(e.name));
    //     navigate('/chat', { state: { user, room: e.name } });
    
    // };
  
    // const leaveRoom = (e) => {
    //   e.preventDefault();
    //   if (user && room) {
    //     // Leave the selected room
    //     socket.emit("leaveroom", { user, room }, (success) => {
    //       if (success) {
    //         setMessage(`Left room ${room}`);
    //       } else {
    //         setMessage(`Unable to leave room ${room}`);
    //       }
    //     });
    //   }
    // };
  
    const createRoom = (e) => {
      e.preventDefault();
      if (room) {
        // Create a new room
        socket.emit("createroom", { room }, (success) => {
          if (success) {
            setMessage(`Created room ${room}`);
          } else {
            setMessage(`Unable to create room ${room}`);
          }
        });
      }
    };

    const gotoCreateRoom = (e) => {
        e.preventDefault();
        socket.user = user;
        console.log('inside create room', user)
        navigate('/createRoom', { state: { user } });

    }

  
    return (
      <div className='container'>
         <h1>Welcome to the chat app</h1>
        <div className='activeUsersContainer'>
            <SideMenu userList={userList}/>
        </div>
        <div className='createRoomContainer'>
            <CreateRoom createRoom={createRoom} gotoCreateRoom={gotoCreateRoom}/>
        </div>
        
        <div className='activeRoomsContainer'>
            <div className='activeRoomsContainer'>
                <ChatRooms roomList={room} 
                // joinRoom={joinRoom}
                />
            </div>
            </div>
        

    
       
      </div>
    );
  }
  
  export default ActiveRooms;