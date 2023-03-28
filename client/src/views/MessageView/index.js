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
