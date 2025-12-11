import { useDispatch, useSelector } from "react-redux";
import { CREATE_POST } from "../utils/constant";
import { addPostsToFeed } from "../redux/feedSlice";
import { useEffect } from "react";

const useFeedPosts = () => {
  const dispatch = useDispatch();
  const feedPosts = useSelector((store) => store.Feed.feed);
  const currentData = useSelector((store) => store.Feed.currentData);

  const GetAllPostForFeed = async (page = 1) => {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(CREATE_POST + `?page=${page}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    if (data?.statusCode) {
      dispatch(addPostsToFeed(data?.data));
    }
  };

  const handleIntersect = (inView) => {
    if (currentData?.hasNextPage && inView) {
      GetAllPostForFeed(currentData?.nextPage);
    }
  };

  useEffect(() => {
    GetAllPostForFeed();
  }, []);

  return { feedPosts, handleIntersect };
};

export default useFeedPosts;
