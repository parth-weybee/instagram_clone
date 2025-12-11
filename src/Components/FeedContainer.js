import FeedPostContainer from "./FeedPostContainer";
import { InView } from "react-intersection-observer";
import useFeedPosts from "../hooks/useFeedPosts";

const FeedContainer = () => {
  
  const {feedPosts,handleIntersect} = useFeedPosts();
  return (
    <div className="w-full mx-auto mb-[100px] | md:w-6/12 md:mb-0 | lg:md:w-3/12">
      {feedPosts.length > 0 && (
        <>
          {feedPosts.map((post, index) => {
            if (index === feedPosts.length - 1) {
              return (
                <InView
                  key={post._id}
                  onChange={(inView, entry) => handleIntersect(inView)}
                >
                  {({ inView, ref, entry }) => (
                    <div ref={ref}>
                      <FeedPostContainer post={post} />
                    </div>
                  )}
                </InView>
              );
            }
            return <FeedPostContainer post={post} key={post._id} />;
          })}
        </>
      )}
    </div>
  );
};

export default FeedContainer;
