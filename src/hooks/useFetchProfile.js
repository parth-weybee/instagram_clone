import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GET_CURRENT_USER, PROFILE_API } from "../utils/constant";
import { setUser } from "../redux/userSlice";
import { setProfile } from "../redux/profileSlice";

    

const useFetchProfile = ()=>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fetchProfile = async () => {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(PROFILE_API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await response.json();
    if (data.statusCode === 200) {
      dispatch(setProfile(data?.data));
      if (data?.data?.createdAt === data?.data?.updatedAt) {
        navigate("/profile/" + data?.data?.account?.username);
      }
    }
    else
    {
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
  };
  
  const fetchAccount = async () => {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(GET_CURRENT_USER, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await response.json();
    if (data.statusCode === 200) {
      dispatch(setUser(data?.data));
      if (data?.data?.createdAt === data?.data?.updatedAt) {
        navigate("/profile/" + data?.data?.username);
      }
    }
    else
    {
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
  };
  useEffect(()=>
{
    fetchAccount();
    fetchProfile();
},[fetchProfile,fetchAccount])
}

  export default useFetchProfile;