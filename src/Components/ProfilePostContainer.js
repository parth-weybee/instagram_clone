
import React from 'react'
import ImageList from './ImageList'

const ProfilePostContainer = ({posts}) => {
    return (
    <div className='w-full py-10 px-3 flex flex-row flex-wrap mx-auto items-start | md:w-6/12'>
        {posts &&
            posts.map(post=>(
                <div className='border-gray-300 items-center pb-10 w-4/12'>
                    <ImageList imageList={post?.images?.map(images=> images.url)}/>
                </div>
            ))
        }
        {/* <h1 className='text-white'>Hello from Post PostContainerHeader</h1> */}
    </div>
  )
}

export default ProfilePostContainer