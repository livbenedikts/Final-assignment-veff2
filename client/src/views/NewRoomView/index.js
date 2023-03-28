import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import NewRoom from '../../components/NewRoom';
import { Box } from '@mui/system';
import { TextField, Button, FormLabel, FormControl,FormControlLabel, Radio, RadioGroup } from '@mui/material';
import './styles.scss';
const socket = io.connect('http://localhost:8080');
const label = { inputProps: { 'aria-label': 'Switch demo' } };




const NewRoomView = () => {

    // const socket = useSelector(({socket}) => socket);
    // const username = useSelector(({session}) => session.username);

    // const [user, setUser] = useState("");
    // const [room, setRoom] = useState("");
    // const [topic, setTopic] = useState("");
    // const [roomList, setRoomList] = useState([]);
    // const [password, setPassword] = useState('');
    // const [isPasswordEnabled, setIsPasswordEnabled] = useState(true);
    // const navigate = useNavigate();


    // useEffect(() => {
    //     // Get the list of available rooms when the component mounts
    //     socket.emit("rooms");

    //     // Get the list of connected users when the component mounts
    //     socket.emit("users");

    //     // Listen for updates to the list of available rooms
    //     socket.on("roomlist", (room) => {
    //         setRoomList(
    //             Object.entries(room).map (([key, value]) =>  (
    //                 {
    //                     name: key,
    //                     ...value,
    //                 })
    //             ))
    //     });

    //     return () => {
    //         socket.off("roomlist");
    //     }
    // }, [socket]);

    // const handleFormSubmit = (event) => {
    //     event.preventDefault(); // Prevent the default form submission
    //     createRoom(); // Call the addUser function
    // };

    // const createRoom = () => {
    //     // var roomName = room;
    //     // console.log('New room ',roomName, 'created by ', username);

    //     socket.emit('joinroom',  {room: room}, (success) => {
    //         if (success) {
    //             console.log('success');
    //             alert('room created');
    //             var roomName = room;
    //             console.log('New room ',roomName, 'created by ', username);
    //             navigate("/chat", { state: { roomName } })

    //             // navigate('/activeRooms', { state: { username } });  
    //         } else {
    //             console.log('fail');}
    //     }
    //     )
    // }

    // const handlePasswordChange = (event) => {
    //     setPassword(event.target.value);
    // };

    // const handleRadioChange = (event) => {
    //     setIsPasswordEnabled(event.target.value === true);
    // };
    // const handleRoomChange = (event) => {
    //     setRoom(event.target.value);
    //   };
      
    //   const handleRoomBlur = () => {
    //     // Create a new room only if the room name is not empty
    //     if (room.trim()) {
    //       // Code to create a new room
    //     }
    //   };

   
    // const handleTopicChange = (event) => {
    //     setTopic(event.target.value);
    //   };
      
    //   const handleTopicBlur = () => {
    //     // Create a new room only if the room name is not empty
    //     if (topic.trim()) {
    //       // Code to create a new room
    //     }
    //   };



    return (
        <>
        <NewRoom />
        </>

        // <div className='createRoomContainer'>
        //     <h2>Create a new room</h2>
        //     {/* <div className='roomNameTopicContainer'>  */}
        //     <Box className='roomNameTopicContainer' component="form" noValidate autoComplete="off" onSubmit={handleFormSubmit}>
            
        //          <TextField id="roomname-text-field" value={room} onChange={handleRoomChange} onBlur={handleRoomBlur} label="roomname" variant="standard" />
        //         <TextField
        //             id="outlined-number"
        //             label="Topic"
        //             type="text"
        //             value={topic}
        //             onChange={handleTopicChange} 
        //             onBlur={handleTopicBlur}
                    
        //             />
        //         {/* </div> */}
        //         {/* <div className='passwordContainer'> */}
        //         {/* <FormLabel id='password' component="legend">Password</FormLabel>
        //         <RadioGroup 
        //             id='radiogroups'
        //             row
        //             value={isPasswordEnabled ? true : false}
        //             aria-labelledby="demo-radio-buttons-group-label"
        //             defaultValue="no"
        //             name="radio-buttons-group"
        //             onChange={handleRadioChange}
        //         >
        //             <FormControlLabel value="no" control={<Radio />} label="No" />
        //             <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
        //         </RadioGroup>
        //         {isPasswordEnabled && (
        //             <TextField
        //             label="Password"
        //             type="password"
        //             value={password}
        //             onChange={handlePasswordChange}
        //             />
        //         )} */}
        //         {/* </div>     */}
        //         <Button onClick={createRoom} variant="contained"  disabled={!room}>Create room</Button>
        //         </Box>

        // </div>

    )
}
export default NewRoomView;