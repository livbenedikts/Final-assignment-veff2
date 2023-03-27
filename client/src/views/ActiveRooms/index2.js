import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.scss';
import io from 'socket.io-client';
import { Demo, List, ListItem, ListItemText, Typography, Divider, Box, TextField, Button } from '@mui/material';
import SideBar from '../../components/Sidebar';
import { useSelector, useDispatch } from 'react-redux';



const socket = io.connect('http://localhost:8080');

const ActiveRooms = () => {
    const username = useSelector(({session}) => session.username);
    const socket = useSelector(({socket}) => socket);
    const [room, setRoom] = useState("");

    const [roomList, setRoomList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
  
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
    console.log(room)
 
    const joinRoom = (e) => {
        console.log('do i go in here')
        console.log(username);
        socket.emit('joinroom', {room: e.name, pass: "" }, (success) => {
            if (success) {
                console.log('success');
                // navigate('/chat', { state: { username, room: e.name } });
            } else {
                console.log('fail');
            }

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
        socket.username = username;
        navigate('/createRoom', { state: { username } });

    }

  
    return (
      <div className='container'>
         <h1>Welcome to the chat app</h1>
        <SideBar/>
        <div>
        <Button onClick={gotoCreateRoom} variant="contained">Create new room</Button>
        </div>
        <div>
            <h1>Active Rooms</h1>
            {/* <ul>
                {room.map((room) => (
                <button key={room}>
                {room}
            </button>
        ))}
                
            </ul> */}
      
      </div>
        <div>{message}</div>
        <div>
            <List className='activeRoomList' >
            {roomList.map((room) => (
                <ListItem className='roomItem' key={room}>
                    <ListItemText className='roomName'
                        primary={room}
                        secondary={
                            <React.Fragment>
                            <Typography className='usersInRoom' component="span" >Users in Room:</Typography>
                            </React.Fragment>
                        }
                        />
                </ListItem>
              
               
            )) }
            <button onClick={joinRoom}>Join Room</button>   
            <Divider/>
            
            </List>
            </div>
       
      </div>
    );
  }
  
  export default ActiveRooms;