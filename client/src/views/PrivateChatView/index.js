import React from "react";
import PrivateChatRoom from "../../components/PrivateChatRoom";
import HomeButton from "../../components/HomeButton";

const PrivateChatView = () => (
    <div className="privatechat">
        <HomeButton className="homeBtn" />
        <PrivateChatRoom/>
        <h1>hiii</h1>
    </div>
);

export default PrivateChatView;