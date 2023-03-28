import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NewUser from '../NewUser';
import './new_styles.scss';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:8080');


const SideMenu = ({ className }) => {
    const menuClasses = classNames('side-menu', className);
    const [userList, setUserList] = useState([]);
    const location = useLocation();
    const { username } = location.state;

    useEffect(() => {
        socket.emit("users");

        socket.on("userlist", (userlist) => {
            console.log("User list:", userlist);
            setUserList(userlist);
          });

        return () => {
            socket.off("userlist");
        }
    }, [socket]);


    return (
        <div id="side-menu" className={menuClasses}>
            <div className='activeUsers' >
            <h3>Welcome, {username}</h3> 
                <h4>Active Users </h4>
               
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