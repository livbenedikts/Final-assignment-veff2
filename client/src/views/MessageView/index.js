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