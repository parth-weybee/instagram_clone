import React, { useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { handleLike } from '../utils/handler';

const PostDetails = ({likes,caption,tags,isLiked,id}) => {
  const [like,setLike] = useState(isLiked);
  return (
    <>
        <div className='flex flex-row gap-5'>
            <span className='text-white text-3xl cursor-pointer' onClick={()=> {handleLike(id); setLike(!like)}}> {like ? <AiFillHeart className='text-red-500 text-3xl'/> : <AiOutlineHeart/>} </span>
            <span className='text-white text-2xl cursor-pointer'><i className="fa-regular fa-comment"></i></span>
        </div>
        <div>
            <p className='text-white font-semibold'>{likes} likes</p>
            <p className='text-white'>{caption}</p>
            <p className='text-blue-600'>{tags && tags.map(tag => '#' + tag).join(" ")}</p>
        </div>
    </>
  )
}

export default PostDetails