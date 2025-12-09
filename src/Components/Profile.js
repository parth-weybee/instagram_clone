import { useEffect, useState } from "react";
import Edit from "./Edit";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import ProfileDetails from "./ProfileDetails";
import ProfilePostContainer from "./ProfilePostContainer";
import { CREATE_POST, GET_POST_BY_USERNAME } from "../utils/constant";
import { setProfilePosts } from "../redux/profilePostsSlice";
const Profile = (others = false) => {
  // const profile = useSelector(store => store.Profile.userProfile);
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
    // if(!profile)  navigate("/login");
    fetchAllThePost();
  }, []);
  const [isEditMode, setIsEdit] = useState(
    profile?.data?.createdAt === profile?.data?.updatedAt
  );
  return (
    <div className="w-full min-h-screen h-full px-2 bg-black">
      {isEditMode ? (
        <Edit setIsEdit={setIsEdit} />
      ) : (
        <>
          {/* <Header/> */}
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
