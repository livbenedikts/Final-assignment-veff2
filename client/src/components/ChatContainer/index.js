import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Chat from "../Chat";
import "./styles.scss";
import { useParams } from "react-router-dom";
import classNames from "classnames";

const ChatContainer = ({ className }) => {
    const menuClasses = classNames("chatContainer", className);
    const username = useSelector((state) => state.session.username);
    const { roomName } = useParams();

    return (
        <div className="chatContainer">
            <h1>Welcome to {roomName}, {username}</h1>
            <Chat roomID={roomName} />
        </div>   
    );
}

export default ChatContainer; 