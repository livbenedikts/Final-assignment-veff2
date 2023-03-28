import React from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { Button } from '@mui/material';
import classNames from 'classnames';
import io from 'socket.io-client';
// import './styles.scss'


const socket = io.connect('http://localhost:8080');

const CreateRoomBtn = ({className}) => {
    const menuClasses = classNames('createRoomBtn', className);

    const navigate = useNavigate();
    const location = useLocation();
    const { username } = location.state;

    const gotoCreateRoom = (e) => {
        e.preventDefault();
        // socket.username = username;
        navigate('/createRoom', { state: { username } });
    };

    return (
        <div className={menuClasses}>
            <Button variant='contained' onClick={gotoCreateRoom}>Create Room</Button>
        </div>
    );


}

export default CreateRoomBtn;