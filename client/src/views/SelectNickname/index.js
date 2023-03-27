import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { Button, Stack, TextField } from '@mui/material';
import './styles.scss';
import { useSelector, useDispatch } from 'react-redux';
import { addSession } from '../../actions/sessionActions';
const socket = io.connect('http://localhost:8080');

function WelcomeView( ) {
    const socket = useSelector(({socket}) => socket);
    const [username, setUsername] = useState('');
    const [usernameAvailable, setUsernameAvailable] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            console.log('hæ');
        }
    }
    const handleFormSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission
        addUser(); // Call the addUser function
    };

    const addUser = () => {
        socket.emit('adduser', username, (isAvailable) => {
            if (isAvailable) {
                console.log('Username is available', username);
                dispatch(addSession(username));
                navigate('/activeRooms', { state: { username } });                 
           
            } else {
                setUsernameAvailable(false);
            }
        });
    };

    return (
        <div className='usernameContainer'>
            <Stack component="form" noValidate autoComplete="off" onSubmit={handleFormSubmit}>
                <TextField id="username-text-field" value={username} onChange={(event) => { setUsername(event.target.value) }} label="username" variant="standard" onKeyDown={handleKeyPress} />
                <Button onClick={addUser}
                    variant="contained" disabled={!username}>
                    Join Chat
                </Button>
            </Stack>
        </div>
    );
}
export default WelcomeView;