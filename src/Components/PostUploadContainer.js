import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageList from "./ImageList";
import PostContainerHeader from "./PostContainerHeader";
import UserAvatar from "./UserAvatar";
import PostUploadDetails from "./PostUploadDetails";
import { CREATE_POST } from "../utils/constant";
import {
  setPostDetails,
  setPostImages,
  togglePostContainer,
} from "../redux/createPostSlice";

const PostUploadContainer = () => {
  const imageList = useSelector((store) => store.CreatePost.postImages);
  const profile = useSelector((store) => store.Profile.userProfile);
  const caption = useRef();
  const tags = useRef();
  const dispatch = useDispatch();
  const handlePostSubmit = async () => {
    const blobs = await Promise.all(
      imageList.map((imgUrl) => fetch(imgUrl).then((res) => res.blob()))
    );
    const files = blobs?.map(
      (blob, index) =>
        new File([blob], "image" + index + ".png", { type: blob.type })
    );

    const formData = new FormData();
    files.map((file) => {
      formData.append("images", file);
    });
    formData.append("content", caption.current.value);
    tags.current.value.split(", ").map((tag, ind) => {
      formData.append(`tags[${ind}]`, tag);
    });
    const token = localStorage.getItem("accessToken");
    const res = await fetch(CREATE_POST, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });
    const data = await res.json();
    if (data?.statusCode) {
      dispatch(setPostImages(null));
      dispatch(setPostDetails(null));
      dispatch(togglePostContainer(false));
    }
  };
  return (
    <div className="fixed flex-row top-[50%] h-[70%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-3xl bg-[#212328] text-center z-50 w-11/12 overflow-y-scroll justify-center | md:overflow-y-hidden | lg:w-6/12">
      <PostContainerHeader handlePostSubmit={handlePostSubmit} />
      <div className="flex flex-col | md:flex-row">
        <div className="w-8/12 mx-auto bg-black h-full items-center">
          <ImageList imageList={imageList} />
        </div>
        <div className="w-full py-4 px-3 | md:w-4/12">
          <UserAvatar
            url={profile?.coverImage?.url}
            fullName={profile?.firstName + " " + profile?.lastName}
          />
          <hr className="mt-4" />
          <PostUploadDetails caption={caption} tags={tags} />
        </div>
      </div>
    </div>
  );
};

export default PostUploadContainer;
