import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Stack, TextField, Button } from "@mui/material";
import { socket } from "../../socket";

const Selectusername = () => {
  const [username, setUsername] = useState("");
  //     const navigate = useNavigate(); // Use this hook instead
  // const dispatch = useDispatch();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    function addUser(username) {
      socket.emit("adduser", username, (isAvailable) => {
        if (isAvailable) {
          console.log("Username is available");
          setUsername(username);
        } else {
          console.log("Username is not available");
        }
      });
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      addUser(username);
    };

    return () => {
      socket.disconnect();
    };
  }, [username]);

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  // return () => {
  //         socket.off('session');
  //       };
  //     }, [dispatch, navigate, socket]);

  // const onChooseUsername = username => {
  //     console.log('username', username);
  //     socket.auth = { user: username };
  //     console.log('socket', socket);
  //     socket.connect();
  //     console.log('i connect');

  //     }

  return (
    <div className="usernameContainer">
      <Stack component="form" noValidate autoComplete="off">
        <TextField
          id="username-text-field"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          label="username"
          variant="standard"
        />
        <Button
          onClick={addUser(username)}
          variant="contained"
          disabled={!username}
        >
          Join Chat
        </Button>
      </Stack>
      {/* {!isusernameAvailable && <p>{failedMessage}</p>} */}
    </div>
  );
};

export default Selectusername;
