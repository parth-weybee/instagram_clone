import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AVATAR_IMG_URL } from "../utils/constant";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { handleCommentLike, handleDeleteComment } from "../utils/handler";
import { dateFormatter } from "../utils/dateFormater";
import { useSelector } from "react-redux";

const Comment = ({ comment }) => {
  const [like, setLike] = useState(comment?.isLiked);
  const [likes,setLikes] = useState(comment?.likes);
  const [showText, setShowText] = useState(true);
  const [isDeleted,setIsDeleted] = useState(false);
  const profile = useSelector(store => store.Profile.userProfile);
  const navigate = useNavigate();
  if(isDeleted) return <></>
  return (
    <div className="py-4">
      <div
        className="flex flex-row items-center"
        onClick={() =>
          navigate("profile/" + comment?.author?.account?.username)
        }
      >
        <img
          className="w-8 h-8 rounded-full"
          src={comment?.author?.coverImage?.url || AVATAR_IMG_URL}
          alt="AVATAR IMG"
        />
        <div>
          <h1 className="text-sm text-white px-2 w-full">
            {comment?.author?.firstName} {comment?.author?.lastName}
          </h1>
          <div className="flex flex-row gap-3 px-2 text-gray-500 text-xs">
            <p>{dateFormatter(comment?.createdAt)}</p>
            <p>{likes} likes</p>
            {comment?.author?.account?.username === profile?.account?.username && <p className="cursor-pointer text-red-400" onClick={()=> {handleDeleteComment(comment?._id); setIsDeleted(true)}}>Delete</p>}
          </div>
        </div>

        <span
          className="text-white text-xl cursor-pointer ml-auto"
          onClick={() => {
            handleCommentLike(comment._id);
            setLike(!like);
            setLikes(like ? likes - 1: likes + 1)
          }}
        >
          {" "}
          {like ? (
            <AiFillHeart className="text-red-500 mr-auto" />
          ) : (
            <AiOutlineHeart />
          )}{" "}
        </span>
      </div>

      <span className="text-white text-sm">
        {comment?.content.split(" ").length > 10 && showText ? (
          <p>
            {comment?.content.split(" ").slice(0, 10).join(" ")}{" "}
            <span
              className="text-gray-500 cursor-pointer"
              onClick={() => setShowText(false)}
            >
              more...
            </span>
          </p>
        ) : (
          <p>
            {comment?.content}{" "}
            <span
              className="text-gray-500 cursor-pointer"
              onClick={() => setShowText(true)}
            >
              {comment?.content.split(" ").length > 10 ? "...less" : ""}
            </span>
          </p>
        )}
      </span>
    </div>
  );
};

export default Comment;
