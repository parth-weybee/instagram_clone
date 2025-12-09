import React, { useEffect } from "react";
import { GET_CURRENT_USER, PROFILE_API } from "../utils/constant";
import { useDispatch } from "react-redux";
import { setProfile } from "../redux/profileSlice";
import { useNavigate } from "react-router-dom";
import FeedContainer from "./FeedContainer";
import { setUser } from "../redux/userSlice";

const Body = () => {
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
        navigate("/profile");
      }
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
        navigate("/profile");
      }
    }
  };
  useEffect(() => {
    fetchProfile();
    fetchAccount();
  }, []);
  return (
    <>
      <FeedContainer />
    </>
  );
};

export default Body;
