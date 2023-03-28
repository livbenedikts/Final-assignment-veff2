import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { Button, TextField, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

// const socket1 = io.connect('http://localhost:8080');



const NewRoom = () => {
    const location = useLocation();
    const { username } = location.state;
    const [user, setUser] = useState([]);
    const users = useSelector(({session}) => session);

    const [userList, setUserList] = useState([]);
    const socket = useSelector(({socket}) => socket);

    const [room, setRoom] = React.useState('');
    const [pass, setPass] = React.useState(undefined);
    const [topic, setTopic] = React.useState('');
    const [locked, setLocked] = React.useState(false);
    const [roomList, setRoomList] = React.useState([]);
    const navigate = useNavigate();

    const handlePasswordChange = (event) => {setPass(event.target.value) };
    const handleRoomChange = (event) => {setRoom(event.target.value) };
    const handleTopicChange = (event) => {setTopic(event.target.value) };
    const handleRadioChange = (event) => {
        setLocked(event.target.value) };

    

    const handleTopicBlur = () => {
            if (topic.trim()) {}};    
    
    const handleRoomBlur = () => {
        if (room.trim()) {}};

    const handleFormSubmit = (event) => {
        event.preventDefault();
    }
    useEffect(() => {
        // Get the list of available rooms when the component mounts
        socket.emit("rooms");

        // Get the list of connected users when the component mounts
        socket.emit("users");

        socket.on("userlist", (users) => {
            console.log("from server ",users)
            setUserList(users);
           
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
        }
    }, [socket]);

 

    const createRoom = () => {
        socket.username = username;
        var joinObj = {
            room,
            pass,
            topic,
            // locked: locked,
            username: socket.username,
        }
        console.log(joinObj)
        // console.log(roomList)
        // setPass(undefined)
        // console.log(username)
        // setUser(username)
        // console.log("Nei hæ",user)
        
        socket.emit('joinroom', {room, pass, topic, username: socket.username}, (success) => {
            if (success) {
                console.log('success');
                alert('room created');
                // var roomName = room;
                // var room = room.room;
                // console.log('New room ',roomName, 'created by ', username);
                console.log(room)
                var roomName = room;
                setRoomList(...roomList, roomName)
                navigate('/chat', { state: { roomName } });
                // navigate("/chat", { state: { roomName, room} })
                
            
            } else {
                console.log('fail');}
        }
        )
    }

    return (
        <div className='createRoomContainer'>
            <h2>Create a new room {username}</h2>
            <Box className='newRoomContainer' component="form" noValidate autoComplete="off" onSubmit={handleFormSubmit}>
                <TextField id="roomname-text-field" value={room} onChange={handleRoomChange} onBlur={handleRoomBlur} label="Room name" variant="standard" />
                <TextField id="outlined-number" label="Topic" type="text" value={topic} onChange={handleTopicChange} onBlur={handleTopicBlur}/>
             
                {/* <div className='passwordContainer'> 
                    <FormLabel id='password' component="legend">Password</FormLabel>
                    <RadioGroup 
                        id='radiogroups'
                        row
                        value={isPasswordEnabled ? true : false}
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="no"
                        name="radio-buttons-group"
                        onChange={handleRadioChange}>
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    </RadioGroup>
                        {isPasswordEnabled && (
                            <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            />
                        )}
                </div>     */}
                <Button onClick={createRoom} variant="contained"  disabled={!room}>Create room</Button>
                </Box>
        </div>
    );
};

export default NewRoom;