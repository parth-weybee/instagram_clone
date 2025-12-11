import FeedContainer from "./FeedContainer";
import useFetchProfile from "../hooks/useFetchProfile";

const Body = () => {
  useFetchProfile();
  return (
    <>
      <FeedContainer />
    </>
  );
};

export default Body;
