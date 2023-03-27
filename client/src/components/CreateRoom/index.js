import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import io from 'socket.io-client';
// import './styles.scss'
const socket = io.connect('http://localhost:8080');

const CreateRoom = () => {

    const socket = useSelector(({socket}) => socket);
    const username = useSelector((session) => session.username);
    const navigate = useNavigate();

    const gotoCreateRoom = (e) => {
        e.preventDefault();
        socket.username = username;
        navigate('/createRoom', { state: { username } });
    };

    return (
        <div>
            <Button variant='contained' onClick={gotoCreateRoom}>Create Room</Button>
        </div>
    );


}

export default CreateRoom;