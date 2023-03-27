import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import './styles.scss';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:8080');



const SideMenu = () => {

    // const getActiveUsers = useSelector((session) => session.username);
    const getActiveUsers = useSelector((session) => session);
    const [userList, setUserList] = useState([]);
    const socket = useSelector(({socket}) => socket);

    // console.log("jæ",getActiveUsers.id)
    useEffect(() => {
        // socket.emit("rooms");
        socket.emit("users");

        socket.on("userlist", (users) => {
            setUserList(users);
        });

        return () => {
            socket.off("userlist");
        }
    }, [socket]);

    // console.log(userList)

    return (
        <div className='sidebarContainer'>
            <div className='activeUsers' >
                <h3>Active Users </h3>
                <ul className="actUserLis">
                    {userList.map((user) => (
                        <li key={user}>
                            {user}
                        </li>
                    ))}
                </ul>
                <p>Implement user's rooms</p>
            </div>
           
        </div>
    );
    }

export default SideMenu;