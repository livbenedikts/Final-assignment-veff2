import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:8080');

const Chat = () => {
    // const user = useSelector((session) => session);
    const room = useSelector((session) => session);
    const socket = useSelector(({socket}) => socket);
    const [message, setMessage] = useState('');
    const [roomList, setRoomList] = useState([]);


    useEffect(() => {
        socket.emit("rooms");
        socket.emit("users");
        
        socket.on("roomlist", (rooms) => {
            setRoomList(
              Object.entries(rooms).map (([key, value]) =>  (
                  {
                      name: key,
                      ...value,
                  })
              ))
        });
        return () => {
          socket.off("roomlist");
        }
      }, [socket]);

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
      };
      
      const handleMessageBlur = () => {
        if (message.trim()) {
         
        }
      };

    const sendMessage = (e) => {

        e.preventDefault();
        if (message) {
            console.log(e)
            // Send the message to the server
            console.log('trying to send and see if i work', room.session)
            console.log('message', message)
            socket.emit("sendmsg", {roomName: room.session, msg: message}, (success) => {
                if (success) {
                    console.log('success');

                    setMessage('');
                } else {
                    console.log('fail');} })
        }
    };

  return (
    <div>
      <h1>Welcome to </h1>
      <div id="messages">
      </div>
      <form onSubmit={sendMessage}>
        <input type="text" value={message} onChange={handleMessageChange} onBlur={handleMessageBlur} 
         />
        <button type="submit" >Send</button>
      </form>
    </div>
  );
}
export default Chat;