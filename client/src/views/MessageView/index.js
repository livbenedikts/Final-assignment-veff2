<<<<<<< HEAD
import React from "react";
import MessageHistory from "../../components/MessageHistory";
import HomeButton from "../../components/HomeButton";
import "./styles.scss";

const ChatRoomView = () => (
  <div className="chat">
    <HomeButton className="homeBtn" />
    <MessageHistory />
  </div>
);

export default ChatRoomView;
=======
import React from 'react';
import MessageHistory from '../../components/MessageHistory';
import HomeButton from '../../components/HomeButton';
import { useLocation } from 'react-router-dom';

import './styles.scss';


const ChatRoomView = () => {
    const location = useLocation();
    const { username, room } = location.state;
    console.log("from chat room view ",username, room)

    return (
        <div className="chat">
            <HomeButton className="homeBtn" />
            <MessageHistory />
            
        </div>
    );
}

export default ChatRoomView;
>>>>>>> ab105edfcfe26abb75377a010dd27da70b024b66
