<<<<<<< HEAD
import React from "react";
import "./styles.scss";
import NewUser from "../../components/NewUser";

function WelcomeView() {
  return (
    <>
      <NewUser />
    </>
  );
}
export default WelcomeView;
=======
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { Button, Stack, TextField } from '@mui/material';
import './styles.scss';
import { useSelector, useDispatch } from 'react-redux';
import { addSession } from '../../actions/sessionActions';
import NewUser from '../../components/NewUser';
const socket = io.connect('http://localhost:8080');

function WelcomeView( ) {
  

    return (
        <>
        <NewUser/>
        </>
    );
}
export default WelcomeView;
>>>>>>> ab105edfcfe26abb75377a010dd27da70b024b66
