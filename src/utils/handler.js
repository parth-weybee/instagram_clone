import { FOLLOW_API, LIKE_API } from "./constant";

export const handleFollow = async (profile) => {
    const token = localStorage.getItem("accessToken");
    await fetch(FOLLOW_API + profile?.account?._id, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };


export const handleLike = async (id) => {
    console.log("like",id);
    const token = localStorage.getItem("accessToken");
    await fetch(LIKE_API + id, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };