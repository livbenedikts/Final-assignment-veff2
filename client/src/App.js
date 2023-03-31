import { Routes, Route } from "react-router-dom";
import Welcomeview from "./views/WelcomeView";
import MainView from "./views/MainView";
import NewRoomView from "./views/NewRoomView/";
import ChatRoomView from "./views/ChatRoomView";
import PrivateChatView from "./views/PrivateChatView";

const App = () => (
  <Routes>
    <Route path="/" exact element={<Welcomeview />} />
    <Route path="/activeRooms" element={<MainView />} />
    <Route path="/createRoom" element={<NewRoomView />} />
    <Route path="/chat/:roomName" element={<ChatRoomView />} />
    <Route path="/privatechat/:user" element={<PrivateChatView />} />
  </Routes>
);

export default App;
