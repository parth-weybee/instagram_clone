import React, { useState } from "react";
import ImageList from "./ImageList";
import ShowPostContainer from "./ShowPostContainer";
import { useDispatch } from "react-redux";
import {
  setSelectedPost,
  toggleShowSelectedPost,
} from "../redux/selectedPostSlice";

const ProfilePostContainer = ({ posts }) => {
  const dispatch = useDispatch();
  return (
    <div className="w-full py-10 px-3 flex flex-row flex-wrap mx-auto items-start | md:w-6/12">
      {posts &&
        posts.map((post) => (
          <div
            key={post._id}
            className="border-gray-300 items-center pb-10 w-4/12 hover:bg-black hover:opacity-50 cursor-pointer"
            onClick={() => {
              dispatch(setSelectedPost(post));
              dispatch(toggleShowSelectedPost(true));
            }}
          >
            <ImageList
              imageList={post?.images?.map((images) => images.url)}
              showBtns={false}
            />
          </div>
        ))}
    </div>
  );
};

export default ProfilePostContainer;
