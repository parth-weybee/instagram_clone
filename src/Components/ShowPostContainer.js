
import React, { useEffect, useState } from 'react'
import ImageList from './ImageList'
import { useDispatch, useSelector } from 'react-redux'
import UserAvatar from './UserAvatar';
import { toggleShowSelectedPost } from '../redux/selectedPostSlice';
import { fetchAllComments } from '../utils/handler';
import Comment from './Comment';
import PostDetails from './PostDetails';


const ShowPostContainer = () => {
    const post = useSelector(store => store.selectedPost.selectedPost);
    const profile = useSelector(store => store.Profile.userProfile);
    const dispatch = useDispatch();
    const [commentData,setCommentData] = useState(null);
    
    useEffect(()=>
    {
      if(commentData ==null)
      {
        fetchAllComments(post?._id).then((data)=> setCommentData(data));
      }
    },[commentData]);
  return (
    <>
    <div className='w-full fixed h-screen bg-black opacity-70 z-40 top-0 left-0' onClick={()=> dispatch(toggleShowSelectedPost())}></div>
    <div className=''>
         <div className="fixed flex-row top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-3xl text-center z-50 w-11/12 overflow-y-scroll justify-center overflow-x-hidden bg-black | md:overflow-y-hidden | lg:w-6/12">
        {/* <PostContainerHeader handlePostSubmit={handlePostSubmit} /> */}
        <div className="flex flex-col | md:flex-row ">
            <div className="w-8/12 mx-auto my-auto bg-black h-full items-center">
            <ImageList imageList={post?.images?.map(img=> img.url)} />
            </div>
            <div className="w-full py-4 px-3 text-start h-[500px] overflow-y-auto no-scrollbar | md:w-4/12">
            <div className='fixed top-0 bg-[#212328] z-10 w-full'>
            <UserAvatar url={profile?.coverImage.url} fullName={profile?.firstName +" " + profile?.lastName}/>
            </div>
            <hr className="mt-10" />
            <p className='text-start text-white max-h-full overflow-y-auto'>{post?.content}</p>
            <p className='text-start text-blue-500 h-[30px]'>{post?.tags.map((tag)=>"#" + tag).join(" ")}</p>
            <div className='py-5 pb-20'>
              {
                commentData && commentData?.data?.comments?.map((comment)=> <Comment key={comment?._id} comment={comment}/>)
              }
            </div>
            <div className='mt-auto fixed bottom-0 bg-[#212328] w-full'>
              <PostDetails post={post} likes={post?.likes} caption={post?.content} tags={post?.tags} isLiked={post?.isLiked} id={post?._id} showCaption={false} comments={post?.comments} setCommentData={setCommentData}/>
            </div>
            </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default ShowPostContainer