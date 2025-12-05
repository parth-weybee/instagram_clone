import React, {useRef, useState } from "react";
import { PROFILE_API, PROFILE_AVATAR_API } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../redux/profileSlice";
import { dateFormatter } from "../utils/dateFormater";
import UserAvatar from "./UserAvatar";

const Edit = ({setIsEdit}) => {
  const profile = useSelector((store) => store.Profile?.userProfile);
  const dispatch = useDispatch();
  const [error,setError] = useState([]);
  const firstName = useRef(profile?.firstName);
  const fileRef = useRef(null);
  const lastName = useRef(profile?.lastName);
  const location = useRef(profile?.location);
  const bio = useRef(profile?.bio);
  const dataOfBirth = useRef(profile?.dob);
  const phoneNumber = useRef(profile?.phoneNumber);
  const countryCode = useRef(profile?.countryCode);
  const handleSaveChanges = async ()=>
  {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(PROFILE_API, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+ token
      },
      body: JSON.stringify({
        "firstName": firstName?.current?.value,"lastName": lastName?.current?.value && profile.lastName
        ,"location":location?.current?.value,"bio": bio?.current?.value,"dob": dataOfBirth?.current?.value,"phoneNumber": phoneNumber?.current?.value,"countryCode": countryCode?.current?.value
      })
    })
    const data = await response.json();
    if(data?.statusCode == 200)
    {
      dispatch(setProfile(data?.data));
      setIsEdit(false);
    }
    else{
      setError(data?.errors);
    }
  }
  const handleFileChange = async (e)=>
  {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("coverImage",file);
    const token = localStorage.getItem("accessToken");
    const res = await fetch(PROFILE_AVATAR_API, {
      method: "PATCH",
      headers: {
        "Authorization": "Bearer "+ token
      },
      body: formData
    })
    const data = await res.json();
    if(data?.statusCode === 200)
    {
      dispatch(setProfile(data?.data));
    }
    else{
      setError(data?.errors);
    }

  }
  return (
    <div className="w-full mx-auto h-full bg-black pt-6 px-4 overflow-y-scroll pb-24 | md:pb-6 md:w-8/12 md:overflow-y-scroll | lg:h-screen lg:w-6/12">
      <h1 className="text-white text-xl font-semibold">Edit Profile</h1>
      <div className="flex w-full rounded-3xl bg-[#262626] px-6 py-4 my-6 items-center flex-wrap gap-5">
        <UserAvatar url={profile?.coverImage?.url}/>
        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg | md:ml-auto" onClick={()=> fileRef.current.click()}>
          Change Photo
        </button>
        <input
        type="file"
        accept="image/*"
        hidden
        ref={fileRef}
        onChange={handleFileChange}
      />
      </div>
      <form className="flex flex-col" onSubmit={(e)=> e.preventDefault()}>
        <div className="flex flex-row flex-wrap gap-5 my-5 items-center">
          <h1 className="text-white text-lg font-semibold w-full">Full Name: </h1>
          <input
            ref={firstName}
            defaultValue={profile?.firstName}
            type="text"
            className="p-2 bg-transparent border text-white mx-2"
            placeholder="First Name"
          />
          <input
          ref={lastName}
            defaultValue={profile?.lastName}
            type="text"
            className="p-2 bg-transparent border text-white mx-2 "
            placeholder="Last Name"
          />
        </div>
        <div className="flex my-5 flex-wrap gap-3 items-center">
          <h1 className="text-white text-lg font-semibold">Location: </h1>
          <input
          ref={location}
            defaultValue={profile?.location}
            type="text"
            className="p-2 bg-transparent border text-white mx-2"
            placeholder="Enter Location"
          />
        </div>
        <label className="text-white text-lg font-semibold py-2">Bio</label>
        <textarea
        ref={bio}
            defaultValue={profile?.bio}
          className="w-full bg-transparent rounded-lg border resize-none overflow-y-auto text-white p-2"
          rows="3"
        ></textarea>
        <label className="text-white text-lg font-semibold py-2 mt-5">
          Date Of Birth
        </label>
        <input ref={dataOfBirth} 
            defaultValue={dateFormatter(profile?.dob)} type="date" className="p-2 text-white bg-[#262626] rounded-lg" />
        <label className="text-white text-lg font-semibold py-2 mt-5">
          Phone Number
        </label>
        <div className="flex flex-wrap gap-3">
          <h1 className="text-white text-2xl font-semibold">+</h1>
          <input
          ref={countryCode}
            defaultValue={profile?.countryCode}
            type="text"
            className="p-2 bg-transparent border text-white mx-2 w-2/12 | md:w-1/12"
            placeholder="91"
          />
          <input
          ref={phoneNumber}
            defaultValue={profile?.phoneNumber}
            type="text"
            className="p-2 bg-transparent border text-white mx-2 "
            placeholder="123456789"
          />
        </div>
        <div className="flex flex-col py-2">
        {
          error?.length> 0 && error.map(err => <p key={err.key} className="text-red-500"> {Object.values(err)[0]}</p>)
        }
        </div>
        <button className="px-6 py-2 bg-blue-500 my-4 text-white rounded-lg" onClick={handleSaveChanges}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Edit;
