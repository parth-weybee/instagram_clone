import React, { useEffect, useState } from "react";
import { handleFollowList } from "../utils/handler";
import UserAvatar from "./UserAvatar";
import { InView } from "react-intersection-observer";
import { data } from "react-router-dom";

const UserList = ({ isFollowing, setShowUserList, username }) => {
  const [userList, setUserList] = useState(null);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if(!userList)
    {  handleFollowList(isFollowing, username).then((res) => {
      setUserList(res?.data[isFollowing ? "following" : "followers"]);
      setUserData(res);
    });
  }
  });
  const handleIntersect = (inView) => {
    if (userData?.data?.hasNextPage && inView) {
      handleFollowList(isFollowing, username, userData?.data?.nextPage).then(
        (res) => {
          setUserData(res);
          const arr = res?.data[isFollowing ? "following" : "followers"];
          setUserList([...userList, ...arr]);
        }
      );
    }
  };
  return (
    <div>
      <div
        className="w-full fixed h-screen bg-black opacity-70 z-40 top-0 left-0"
        onClick={() => setShowUserList(false)}
      ></div>
      <div className="fixed flex-row top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-[70%] rounded-3xl text-center z-50 w-11/12 bg-[#262626] overflow-y-scroll justify-center no-scrollbar | lg:w-4/12">
        <div className="fixed w-full">
          <button
            className="text-white text-2xl absolute right-3 top-2 cursor-pointer z-10"
            onClick={() => setShowUserList(false)}
          >
            <i className="fa-solid fa-circle-xmark"></i>
          </button>
          <h1 className="top-0 w-full py-2 text-white border-b-2 border-white">
            {isFollowing ? "Following" : "Follower"}
          </h1>
        </div>
        <div className="flex flex-col gap-3 mt-14 px-3">
          {userList &&
            userList.map((user, index) => {
              if (index === userList.length - 1) {
                return (
                  <InView
                    key={user._id}
                    onChange={(inView) => handleIntersect(inView)}
                  >
                    {({ inView, ref, entry }) => (
                      <div ref={ref} onClick={() => setShowUserList(false)}>
                        <UserAvatar
                          url={user?.profile?.coverImage?.url}
                          fullName={
                            user?.profile?.firstName +
                            " " +
                            user?.profile?.lastName
                          }
                          username={user?.username}
                        />
                      </div>
                    )}
                  </InView>
                );
              }
              return (
                <div onClick={() => setShowUserList(false)} key={user?._id}>
                <UserAvatar
                  url={user?.profile?.coverImage?.url}
                  fullName={
                    user?.profile?.firstName + " " + user?.profile?.lastName
                  }
                  username={user?.username}
                />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default UserList;
