import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { NotificationContext } from './NotificationContext';
import { jwtDecode } from "jwt-decode";

const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [unread, setUnread] = useState(0);

    const socketRef = useRef();
    const playSound = () => {
        const audio = new Audio("/sounds/notif.mp3");
        audio.play();
    };

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) return;
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id || decodedToken._id;

        socketRef.current = io("http://localhost:4000");

        socketRef.current.on("connect", () => {
            console.log("Connected to notification server ");

            socketRef.current.emit("joinRoom", userId);

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
    }, [token]);
    
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