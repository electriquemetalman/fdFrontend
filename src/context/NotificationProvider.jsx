import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { NotificationContext } from './NotificationContext';

const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [unread, setUnread] = useState(0);

    const socketRef = useRef();
    const playSound = () => {
        const audio = new Audio("/sounds/notif.mp3");
        audio.play();
    };

    useEffect(() => {
        socketRef.current = io("http://localhost:4000");

        socketRef.current.on("connect", () => {
            console.log("Connected to notification server ");

        });
        
        socketRef.current.on("newNotification", (notif) => {
            console.log("New notification received:", notif);
            playSound();

            setNotifications(prev => [notif, ...prev].slice(0, 5)); // keep only latest 5 notifications
            setUnread(prev => prev + 1);
        });

        return () => {
            socketRef.current.disconnect();
        }
    }, [notifications]);
    
    const markAllAsRead = () => {
        setUnread(0);
    };

    const contextValue = {
        notifications,
        unread,
        markAllAsRead
    };

    return (
        <NotificationContext.Provider value={contextValue}>
            {children}
        </NotificationContext.Provider>
    );
}

export default NotificationProvider;