
import React, { useEffect } from 'react'
import { PROFILE_API } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../redux/profileSlice';
import { useNavigate } from 'react-router-dom';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchProfile = async ()=>
  {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(PROFILE_API, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    })
    const data = await response.json();
    if(data.statusCode === 200)
    {
      dispatch(setProfile(data?.data));
      if(data?.data?.createdAt === data?.data?.updatedAt)
      {
          navigate("/profile");
      }
    }
  }
  useEffect(()=>
  {
    fetchProfile();
  },[])
  return (
<>
    
    <div className='w-full bg-black h-[1000px]'></div>
    <div className='w-full bg-black h-[1000px]'></div>

    <div className='w-full bg-black h-[1000px]'></div>
</>
  )
}

export default Body