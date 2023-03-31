import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LeaveBtn from "../LeaveRoomButton";
import Chat from "../Chat";
import { useParams } from "react-router-dom";


const PrivateChatRoom = () => {
    const senderusername = useSelector((state) => state.session.username);
    const { user } = useParams();



    return (
        <div className="chat">
      <h2>Private chat with, {user}</h2>
        <div className="">
            <Chat/>
        </div>
      </div>
        
    );


}

export default PrivateChatRoom; 