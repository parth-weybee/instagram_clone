import React from "react";
import UserAvatar from "./UserAvatar";
import ImageList from "./ImageList";
import PostDetails from "./PostDetails";

const FeedPostContainer = ({ post }) => {
  return (
    <div className="py-5 px-3">
      <div className="h-[50px]">
        <UserAvatar
          fullName={post?.author?.firstName + " " + post?.author?.lastName}
          url={post?.author?.coverImage?.url}
          username={post?.author?.account?.username}
        />
      </div>
      <div className=" w-[300px] mx-auto ">
        <ImageList imageList={post?.images.map((img) => img.url)} />
      </div>
      <PostDetails
        post={post}
        likes={post?.likes}
        caption={post?.content}
        tags={post?.tags}
        isLiked={post?.isLiked}
        id={post?._id}
        showCaption={true}
        comments={post?.comments}
      />
    </div>
  );
};

export default FeedPostContainer;
