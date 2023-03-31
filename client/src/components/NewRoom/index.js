import React, { useState, useEffect } from "react";
import { Button, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";
import { useSelector } from "react-redux";

const NewRoom = () => {
  const username = useSelector((state) => state.session.username);
  const [room, setRoom] = React.useState("");
  const [pass, setPass] = React.useState(undefined);
  const [topic, setTopic] = React.useState("");
  const [locked, setLocked] = React.useState(false);
  const [roomList, setRoomList] = React.useState([]);
  const navigate = useNavigate();
  const [roomObj, setRoomObj] = useState([]);

  const handlePasswordChange = (event) => {
    setPass(event.target.value);
  };
  const handleRoomChange = (event) => {
    setRoom(event.target.value);
  };
  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };
  const handleRadioChange = (event) => {
    setLocked(event.target.value);
  };

  const handleTopicBlur = () => {
    if (topic.trim()) {
    }
  };

  const handleRoomBlur = () => {
    if (room.trim()) {
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };
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
  }, [socket]);

  const createRoom = () => {
    // var room = {
    //     room: room,
    //     pass: pass,
    //     topic: topic,
    //     // locked: locked,
    //     username: username
    // }
    var roomObj = {name: room, pass: pass, topic: topic, locked: locked, username: username, users: username}
    console.log(roomObj);
    setRoomObj(roomObj);
    socket.emit("joinroom", { room: roomObj.name, pass: roomObj.pass }, (success) => {
      if (success) {
        console.log(roomObj.topic);
        
        if (roomObj.topic !== undefined) {
            socket.emit("settopic", {room: roomObj.name, topic: roomObj.topic})
        }
        alert("New room created!");
        
        
        console.log(room);
        navigate("/activeRooms");
      } else {
        console.log("fail");
      }
    });
  };

  return (
    <div className="createRoomContainer">
      <h2>Create a new room {username}</h2>
      <Box
        className="newRoomContainer"
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleFormSubmit}
      >
        <TextField
          id="roomname-text-field"
          value={room}
          inputProps={{ style: { textTransform: "capitalize" } }}
          onChange={handleRoomChange}
          onBlur={handleRoomBlur}
          label="Room name"
          variant="standard"
        />
        <TextField
          id="outlined-number"
          label="Topic"
          type="text"
          inputProps={{ style: { textTransform: "capitalize" } }}
          value={topic}
          onChange={handleTopicChange}
          onBlur={handleTopicBlur}
        />

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
        <Button onClick={createRoom} variant="contained" disabled={!room}>
          Create room
        </Button>
      </Box>
    </div>
  );
};

export default NewRoom;
