import React from 'react'
import './UpdateProfile.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from "react-toastify";

const UpdateProfile = ({url, token, user, fetchUser}) => {

    const [profile, setProfile] = React.useState(false);

    const onSubmitHandler = async(event) => {
        try {
            event.preventDefault();
            const formData = new FormData();
            formData.append("profile", profile);
            const response = await axios.post(`${url}/api/user/updateProfile`, formData, {headers: {Authorization: `Bearer ${token}`}});
            if (response.data.success){
                setProfile(false)
                toast.success(response.data.message);
                fetchUser();
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error("Error uploading profile picture:", error);
            toast.error("An error occurred while updating the profile picture.");
        }

    }

  return (
    <div className='update-Profile'>
        <div className='update-profile-display'>
            <div className='contain-profile'>
                <img src={user && user.profile ? `${url}/profiles/` + user.profile : assets.defaultAdminPro} alt='' />
            </div>
        </div>
        <div className='update-profile-form'>
            <form className='' onSubmit={onSubmitHandler}>
                <div className='update-profile-pic-upload flex-col'>
                    <p>Upload Profile Picture</p>
                    <label htmlFor='image'>
                        <img src={profile?URL.createObjectURL(profile):assets.upload_area} alt='' />
                    </label>
                    <input type='file' onChange={(e) => setProfile(e.target.files[0])} id='image' hidden required/>
                </div>
                <button type='submit' className='update-btn'>Update Profile</button>    
            </form>        
        </div>
    </div>
  )
}

export default UpdateProfile
