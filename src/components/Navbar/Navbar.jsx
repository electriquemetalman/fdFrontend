import React from 'react';
import { useState, useCallback } from 'react';
import './Navbar.css';
import {assets} from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { NotificationContext } from '../../context/NotificationContext.jsx';
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = ({setShowLogin}) => {

    const [menu, setMenu] = useState("home");
    const [user, setUser] = useState(null);
    const {getTotalCartAmount, token, setToken, url} = React.useContext(StoreContext);
    const { notifications, unread, markAllAsRead } = React.useContext(NotificationContext);
    const navigate = useNavigate();

    const [showNotifications, setShowNotifications] = React.useState(false);

    const toggleNotifications = () => {
      setShowNotifications(!showNotifications);
      if (unread > 0) {
        markAllAsRead();
      }
    };

    const logout = () => {
      localStorage.removeItem("token");
      setToken("");
      navigate("/");
      toast.success("Successful Logout");

    }

    const fetchUser = useCallback(async () => {
    try {
      const response = await axios.get(url + "/api/user/getUser", {headers: {Authorization: `Bearer ${token}`}});
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  }, [url, token]);

  React.useEffect(() => {
    if (token)
    fetchUser();
  }, [fetchUser, token]);

  return (
    <div className="navbar">
      <Link to="/"><img src={assets.logo} alt="" className='logo'/></Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={()=>setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a href='#app-download' onClick={()=>setMenu("mobile")} className={menu === "mobile" ? "active" : ""}>Mobile App</a>
        <a href='#footer' onClick={()=>setMenu("contact")} className={menu === "contact" ? "active" : ""}>Contact</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" className="search"/>
        <div className="notif-container">
          <img
            src={assets.notification_icon}
            alt="notifications"
            className="notification-icon"
            onClick={toggleNotifications}
          />
        
          {unread > 0 && <span className="notif-badge">{unread}</span>}
        
          {showNotifications && (
              <div className="notif-dropdown">
                  {notifications.length === 0 ? (
                      <p className="no-notif">No notification</p>
                  ) : (
                      notifications.map((notif, index) => (
                        <div key={index} className="notif-item">
                          <p>{notif.message}</p>
                        </div>
                      ))
                  )}
              </div>
          )}
        </div>
        <div className="navbar-search-icon">
            <Link to="/cart"><img src={assets.basket_icon} alt="" className="basket"/></Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? <button onClick={()=>setShowLogin(true)}  className="login-btn">Login</button>
          :<div className='navbar-profile'>
            <img src={user && user.profile ? `${url}/profiles/` + user.profile : assets.profile_icon} alt='' className='profileImg' />
            <ul className='nav-profile-dropdown'>
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt=''/>
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={() => navigate('/profile')}>
                <img src={assets.bag_icon} alt=''/>
                <p>Profile</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt=''/>
                <p>Logout</p>
              </li>
            </ul>
          </div>
        }
        
      </div>
    </div>
  )
}

export default Navbar
