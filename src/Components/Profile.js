import { useEffect, useState } from "react"
import Edit from "./Edit"
import Header from './Header'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import ProfileDetails from "./ProfileDetails"
import ProfilePostContainer from "./ProfilePostContainer"
import { CREATE_POST } from "../utils/constant"
import { setProfilePosts } from "../redux/profilePostsSlice"
const Profile = () => {
  const profile = useSelector(store => store.Profile.userProfile);
  const profilePosts = useSelector(store => store.ProfilePost);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchAllThePost = async ()=>
  {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(CREATE_POST,{
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token
      },
    })
    const data = await res.json();
    if(data?.statusCode)
    {
      dispatch(setProfilePosts(data?.data));
    }
  }
  useEffect( ()=>
  {
    if(!profile)  navigate("/login"); 
    fetchAllThePost();
  },[]);
  const [isEditMode,setIsEdit] = useState(profile?.createdAt === profile?.updatedAt);
  return (
    <div className='w-full min-h-screen h-full px-2 bg-black overflow-y-scroll'>
        {
          isEditMode ? 
          <Edit setIsEdit={setIsEdit}/> : <>
          {/* <Header/> */}
          <ProfileDetails setIsEdit={setIsEdit} noOfPosts={profilePosts?.totalPosts}/>
          <ProfilePostContainer  posts={profilePosts?.posts}/>
        </>
        }
    </div>
  )
}

export default Profile;