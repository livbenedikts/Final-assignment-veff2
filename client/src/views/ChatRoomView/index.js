import React from "react";
import ChatContainer from "../../components/ChatContainer";
import HomeButton from "../../components/HomeButton";
import LeaveBtn from "../../components/LeaveRoomButton";
import "./styles.scss";

const ChatRoomView = () => (
  <div className="chatRoomView">
    <HomeButton className="homeBtn" />
    <LeaveBtn className="leaveBtn"/>
    <ChatContainer className="chatContainer"/>
  </div>
);

export default ChatRoomView;
