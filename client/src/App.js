import { Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import Welcomeview from './views/WelcomeView';
import MainView from './views/MainView';
import NewRoomView from './views/NewRoomView';
// import Chat from './components/Chat';
import ChatRoomView from './views/MessageView';


const socket = io('http://localhost:8080');


const App = () => (
    <Routes>
        <Route path="/" exact element={<Welcomeview/>} />
        <Route path="/activeRooms" element={<MainView/>} />
        <Route path='/createRoom' element={<NewRoomView/>}/>
        <Route path='/chat' element={<ChatRoomView/>}/>

    </Routes>

)
    

export default App;