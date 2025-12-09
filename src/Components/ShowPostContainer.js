
import React from 'react'
import ImageList from './ImageList'
import { useSelector } from 'react-redux'
import UserAvatar from './UserAvatar';


const ShowPostContainer = ({setShowPost}) => {
    const post = useSelector(store => store.selectedPost);
    const profile = useSelector(store => store.Profile.userProfile);
  return (
    <>
    <div className='w-full fixed h-screen bg-black opacity-70 z-40 top-0 left-0' onClick={()=> setShowPost(false)}></div>
    <div className=''>
        
         <div className="fixed flex-row top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-3xl bg-[#212328] text-center z-50 w-11/12 overflow-y-scroll justify-center | md:overflow-y-hidden | lg:w-6/12">
        {/* <PostContainerHeader handlePostSubmit={handlePostSubmit} /> */}
        <div className="flex flex-col | md:flex-row">
            <div className="w-8/12 mx-auto bg-black h-full items-center">
            <ImageList imageList={post?.images?.map(img=> img.url)} />
            </div>
            <div className="w-full py-4 px-3 text-start| md:w-4/12">
            
            <UserAvatar url={profile?.coverImage.url} fullName={profile?.firstName +" " + profile?.lastName}/>
            <hr className="mt-4" />
            <p className='text-start text-white max-h-full overflow-y-auto'>{post?.content}</p>
            <p className='text-start text-blue-500 h-[30px]'>{post?.tags.map((tag)=>"#" + tag).join(" ")}</p>

            </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default ShowPostContainer