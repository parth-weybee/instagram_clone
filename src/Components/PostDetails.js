import React, { useRef, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { handleComment, handleLike } from "../utils/handler";
import { current } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { togglePostContainer } from "../redux/createPostSlice";
import {
  setSelectedPost,
  toggleShowSelectedPost,
} from "../redux/selectedPostSlice";

const PostDetails = ({
  likes,
  caption,
  tags,
  isLiked,
  id,
  showCaption,
  comments,
  post,
  setCommentData
}) => {
  const [like, setLike] = useState(isLiked);
  const [likesState,setLikesState] = useState(likes);
  const [showText, setShowText] = useState(true);
  const commentContent = useRef();
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex flex-row gap-5">
        <span
          className="text-white text-3xl cursor-pointer"
          onClick={() => {
            handleLike(id);
            setLike(!like);
            setLikesState(like ? likesState - 1: likesState + 1);
          }}
        >
          {" "}
          {like ? (
            <AiFillHeart className="text-red-500 text-3xl" />
          ) : (
            <AiOutlineHeart />
          )}{" "}
        </span>
        <span
          className="text-white text-2xl cursor-pointer"
          onClick={() => {
            dispatch(setSelectedPost(post));
            dispatch(toggleShowSelectedPost(true));
          }}
        >
          <i className="fa-regular fa-comment"></i>
        </span>
      </div>
      <div>
        <p className="text-white font-semibold">{likesState} likes</p>
        {showCaption && (
          <>
            {caption?.split(" ").length > 10 && showText ? (
          <p className="text-white">
            {caption?.split(" ").slice(0, 10).join(" ")}{" "}
            <span
              className="text-gray-500 cursor-pointer"
              onClick={() => setShowText(false)}
            >
              more...
            </span>
          </p>
        ) : (
          <p className="text-white">
            {caption}{" "}
            <span
              className="text-gray-500 cursor-pointer"
              onClick={() => setShowText(true)}
            >
              {caption.split(" ").length > 10 ? "...less" : ""}
            </span>
          </p>
        )}
            
            <p className="text-blue-600">
              {tags && tags.map((tag) => "#" + tag).join(" ")}
            </p>
            <p
              className="text-gray-500 text-md cursor-pointer"
              onClick={() => {
                dispatch(setSelectedPost(post));
                dispatch(toggleShowSelectedPost(true));
              }}
            >
              View all {comments} comments
            </p>
          </>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleComment(id, commentContent.current.value);
            commentContent.current.value = "";
            dispatch(toggleShowSelectedPost(true));
            setCommentData(null);
          }}
        >
          <input
            ref={commentContent}
            type="text"
            placeholder="😀 Add a comment..."
            className="w-full py-2 focus:outline-none border-none bg-transparent text-gray-500"
          />
        </form>
      </div>
    </>
  );
};

export default PostDetails;
