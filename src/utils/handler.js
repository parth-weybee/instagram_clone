import { COMMENT_API, COMMENT_LIKE_API, DELETE_COMMENT, DELETE_POST, FOLLOW_API, GET_FOLLOWER_LIST, GET_FOLLOWING_LIST, LIKE_API } from "./constant";

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
    await fetch(COMMENT_LIKE_API + id,{
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token
      }
    })
  }

  export const handleFollowList = async (isFollowing,username,page = 1) =>
  {
    const token = localStorage.getItem("accessToken");
    const res = await fetch((isFollowing ? GET_FOLLOWING_LIST : GET_FOLLOWER_LIST) + username + `?page=${page}&limit=10` ,{
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token
      }
    })
    return await res.json();
  }

  export const handleDeletePost = async (id)=>
  {
    const token = localStorage.getItem("accessToken");
    await fetch(DELETE_POST + id ,{
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + token
      }
    })
  }

  export const handleDeleteComment = async (id)=>
  {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(DELETE_COMMENT + id ,{
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + token
      }
    })
    console.log(res);
  }