import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  TextField,
  Button,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import "./styles.scss";
import { socket } from "../../socket";
const label = { inputProps: { "aria-label": "Switch demo" } };

const NewRoom = () => {
  const socket1 = useSelector(({ socket }) => socket);
  const curruser = useSelector((session) => session);

  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);

  // find corresponding username from socket.id
  console.log(curruser);

  const handleRadioChange = (event) => {
    setIsPasswordEnabled(event.target.value === "Yes");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const joinRoom = (e) => {
    // If room name is not specified, don't create the room
    if (!room) {
      return;
    }

    // get the current user
    const user = curruser.username;

    const joinObj = {
      room,
      user,
      pass: isPasswordEnabled ? password : undefined,
    };
    console.log("joinObj", joinObj);

    socket.emit("joinroom", joinObj, (accepted) => {
      if (accepted) {
        setUser((prevState) => ({
          ...prevState,
          channels: {
            ...prevState.channels,
            [room]: {
              room: room,
              topic: topic,
              password: password,
            },
          },
        }));
        console.log("success");
        // Redirect to the newly created room if it was accepted
        console.log("jibbícola room is ", accepted);
        // navigate(`/room/${room}`, { state: { username, room } });
      } else {
        // Display error message if the room was not accepted
        console.log("Room not accepted!");
      }
    });
  };

  return (
    <div className="createRoomContainer">
      <h2>Create a new room</h2>
      <div className="roomNameTopicContainer">
        <TextField
          required
          id="outlined-required"
          label="Room name"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <TextField
          id="outlined-number"
          label="Topic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          // InputLabelProps={{
          //     shrink: true,
          // }}
        />
      </div>
      <div className="passwordContainer">
        <FormLabel id="password" component="legend">
          Password
        </FormLabel>
        <RadioGroup
          id="radiogroups"
          row
          value={isPasswordEnabled ? "Yes" : "no"}
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="no"
          name="radio-buttons-group"
          onChange={handleRadioChange}
        >
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
      </div>
      <Button onClick={(e) => joinRoom(e)} variant="contained">
        Create room
      </Button>
    </div>
  );
};
export default NewRoom;
