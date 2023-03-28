import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Stack, TextField } from "@mui/material";
import { addSession } from "../../actions/sessionActions";
import { socket } from "../../socket";

const NewUser = () => {
  const [username, setUsername] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
    }
  };
  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    addUser(); // Call the addUser function
  };

  const addUser = () => {
    socket.emit("adduser", username, (isAvailable) => {
      if (isAvailable) {
        console.log("Username is available", username);
        dispatch(addSession(username));
        navigate("/activeRooms");
      } else {
        setUsernameAvailable(false);
      }
    });
  };

  return (
    <div className="usernameContainer">
      <Stack
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleFormSubmit}
      >
        <TextField
          id="username-text-field"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          label="username"
          variant="standard"
          onKeyDown={handleKeyPress}
        />
        <Button onClick={addUser} variant="contained" disabled={!username}>
          Join Chat
        </Button>
      </Stack>
    </div>
  );
};
export default NewUser;
