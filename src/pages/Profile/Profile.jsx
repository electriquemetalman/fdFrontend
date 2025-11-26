import React, {useContext, useState, useEffect, useCallback} from 'react'
import './Profile.css'
import { StoreContext } from '../../context/StoreContext'
import UpdateProfile from '../../components/UpdateProfile/UpdateProfile'
import UpdateInfo from '../../components/UpdateInfo/UpdateInfo'
import axios from 'axios'

const Profile = () => {
    const { token, url } = useContext(StoreContext);

    const [user, setUser] = useState();

    const fetchUser = useCallback(async () => {
        try {
            const response = await axios.get(url + "/api/user/getUser", {headers: {Authorization: `Bearer ${token}`}});
            if (response.data.success) {
                setUser(response.data.user);
                
            }
        } catch (error) {
            console.error("Failed to fetch user:", error,);
        }
    }, [url, token]);

  useEffect(() => {
    if (!token) return;
    fetchUser();
  }, [fetchUser, token]);
  
  return (
    <div>
      <UpdateProfile url={url} token={token} user={user} fetchUser={fetchUser} />
      <UpdateInfo url={url} token={token} user={user} fetchUser={fetchUser} />
    </div>
  )
}

export default Profile
