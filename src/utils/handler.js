import { COMMENT_API, COMMENT_LIKE_API, FOLLOW_API, LIKE_API } from "./constant";

export const handleFollow = async (profile) => {
    const token = localStorage.getItem("accessToken");
    await fetch(FOLLOW_API + profile?.account?._id, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token,
      },
    });
  };


export const handleLike = async (id) => {
    const token = localStorage.getItem("accessToken");
    await fetch(LIKE_API + id, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token,
      }
    });
  };

  export const handleComment = async (id,content)=>
  {
    const token = localStorage.getItem("accessToken");
    await fetch(COMMENT_API + id, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify({
        "content": content
      })
    });
  }

  export const fetchAllComments = async (id)=>
  {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(COMMENT_API + id,{
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token
      }
    })
    const data = await res.json();
    console.log(data);
    return data;
  }

    export const handleCommentLike = async (id)=>
  {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(COMMENT_LIKE_API + id,{
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token
      }
    })
  }