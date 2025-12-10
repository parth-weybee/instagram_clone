import { useEffect, useState } from "react";
import Edit from "./Edit";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import ProfileDetails from "./ProfileDetails";
import ProfilePostContainer from "./ProfilePostContainer";
import { GET_POST_BY_USERNAME } from "../utils/constant";
import { setProfilePosts } from "../redux/profilePostsSlice";
const Profile = () => {
  // const profile = useSelector(store => store.Profile.userProfile);
  const {id} = useParams();
  const profile = useLoaderData();
  const profilePosts = useSelector((store) => store.ProfilePost);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchAllThePost = async () => {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(
      GET_POST_BY_USERNAME + profile?.data?.account?.username,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const data = await res.json();
    if (data?.statusCode) {
      dispatch(setProfilePosts(data?.data));
    }
  };
  useEffect(() => {
    if(!localStorage.getItem("accessToken"))  navigate("/login");
    if(!profile) navigate("/");
    if(id !== profilePosts?.posts[0]?.author?.account?.username){
      fetchAllThePost();
    }
  });
  const [isEditMode, setIsEdit] = useState(
    profile?.data?.createdAt === profile?.data?.updatedAt
  );
  return (
    <div className="w-full min-h-screen h-full px-2 bg-black">
      {isEditMode ? (
        <Edit setIsEdit={setIsEdit} />
      ) : (
        <>
          <ProfileDetails
            setIsEdit={setIsEdit}
            noOfPosts={profilePosts?.totalPosts}
            profile={profile?.data}
          />
          <ProfilePostContainer posts={profilePosts?.posts} />
        </>
      )}
    </div>
  );
};

export default Profile;
