import { Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import SelectUsername from './views/SelectNickname';
import ActiveRooms from './views/ActiveRooms';
import NewRoom from './views/NewRoom';
import Chat from './components/Chat';


const socket = io('http://localhost:8080');


const App = () => (
    <Routes>
        <Route path="/" exact element={<SelectUsername/>} />
        <Route path="/activeRooms" element={<ActiveRooms/>} />
        <Route path='/createRoom' element={<NewRoom/>}/>
        <Route path='/chat' element={<Chat/>}/>

    </Routes>

)
    

export default App;