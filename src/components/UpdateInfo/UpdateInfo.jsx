import React, { useEffect } from 'react'
import './UpdateInfo.css'
import axios from "axios"
import { toast } from "react-toastify";

const UpdateInfo = ( { url, user, token, fetchUser  } ) => {

  const [data, setData] = React.useState({
        name: user?user.name:"",
        email: user?user.email:"",
  })


  const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}))
  }

    const onSubmitHandler2 = async(event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${url}/api/user/updateUser`, data, {headers: {Authorization: `Bearer ${token}`}});
            if (response.data.success){
                toast.success(response.data.message);
                fetchUser();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error updating info:", error);
            toast.error("An error occurred while updating the information.");
        }
    }

    useEffect(() => {
        setData({
            name: user?user.name:"",
            email: user?user.email:"",
        })
    }, [user, fetchUser]);

  return (
    <div className='update-info'>
        <div className='update-info-form'>
            <form className='update-form flex-col' onSubmit={onSubmitHandler2}>
                <div className='update-user-group flex-col'>
                    <label>name</label>
                    <input type='text' onChange={onChangeHandler} name='name' value={data.name} />
                </div>
                <div className='update-user-group flex-col'>
                    <label>Email</label>
                    <input type='email' onChange={onChangeHandler} name='email' value={data.email} />
                </div>
                <button type='submit' className='update-btn'>Update Info</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateInfo
