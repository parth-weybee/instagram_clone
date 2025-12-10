
import React, { useEffect } from 'react'
import FeedPostContainer from './FeedPostContainer'
import { useDispatch, useSelector } from 'react-redux'
import { CREATE_POST } from '../utils/constant';
import { addPostsToFeed } from '../redux/feedSlice';
import { InView } from "react-intersection-observer";

const FeedContainer = () => {
    const dispatch = useDispatch();
    const feedPosts = useSelector(store => store.Feed.feed);
    const currentData = useSelector(store => store.Feed.currentData);
    const GetAllPostForFeed = async (page = 1)=>
      {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(CREATE_POST + `?page=${page}`,{
          method: "GET",
          headers: {
            "Authorization": "Bearer " + token
          },
        })
        const data = await res.json();
        if(data?.statusCode)
        {
          dispatch(addPostsToFeed(data?.data));
        }
      }
      const handleIntersect = (inView)=>
      {
        if(currentData?.hasNextPage && inView)
            {
                GetAllPostForFeed(currentData?.nextPage);
            }   
      }
      useEffect( ()=>
      {
        GetAllPostForFeed();
      },[]);
  return (
    <div className='w-full mx-auto mb-[100px] | md:w-6/12 md:mb-0 | lg:md:w-3/12'>
        { feedPosts.length > 0 && 
            <>
                {feedPosts.map((post,index) => 
                    {
                        if(index === feedPosts.length -1)
                        {
                            return <InView key={post._id} onChange={(inView, entry) => handleIntersect(inView)}>
                                {({ inView, ref, entry }) => (
                                    <div ref={ref}>
                                        <FeedPostContainer post={post} />
                                    </div>
                                    )}
                                </InView>
                        }
                        return <FeedPostContainer post={post} key={post._id}/>
                    }
                )}
            </>
        }
    </div>
  )
}

export default FeedContainer