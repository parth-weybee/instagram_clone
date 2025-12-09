import { useSelector } from "react-redux";
import { AVATAR_IMG_URL, FOLLOW_API } from "../utils/constant";
import { useEffect, useState } from "react";
import { handleFollow } from "../utils/handler";

const ProfileDetails = ({ setIsEdit, noOfPosts, profile }) => {
  const account = useSelector((store) => store?.User);
  const [follow,setFollow] = useState(profile?.isFollowing);
  return (
    <div className="w-full mx-auto | md:w-8/12">
      <div className="mx-auto pt-24 py-16 w-10/12 | lg:w-6/12">
        <div className="flex flex-col items-center | md:flex-row">
          <img
            className="w-36 h-36 rounded-full"
            src={profile?.coverImage?.url || AVATAR_IMG_URL}
            alt="AVATAR IMG"
          />
          <div className="w-full px-4 text-wrap">
            <h1 className="text-white font-semibold text-2xl">
              {profile?.firstName} {profile.lastName}
            </h1>
            <h1 className="text-white text-lg">{profile?.account?.username}</h1>
            <p className="text-white text-md font-normal">
              <span className="font-semibold">{noOfPosts || "0"}</span> posts{" "}
              <span className="font-semibold">{profile?.followersCount}</span>{" "}
              followers{" "}
              <span className="font-semibold">{profile?.followingCount}</span>{" "}
              following
            </p>
            <p className="text-white text-lg mt-5">{profile?.bio}</p>
          </div>
        </div>
        {account?.username === profile?.account?.username ? (
          <button
            className="bg-[#262626] mx-auto px-24 py-3 text-gray-300 my-6 rounded-lg"
            onClick={() => setIsEdit(true)}
          >
            Edit Button
          </button>
        ) : (
          <button
            className={follow ? "mx-auto px-24 py-3 text-gray-300 my-6 rounded-lg bg-[#262626]" : "mx-auto px-24 py-3 text-gray-300 my-6 rounded-lg bg-blue-500"}
            onClick={() =>{ handleFollow(profile); setFollow(!follow)}}
          >
            {follow ? "UnFollow" : "Follow"}
          </button>
        )}
      </div>
      <hr />
    </div>
  );
};

export default ProfileDetails;
