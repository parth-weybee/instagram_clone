
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { GET_POST_BY_TAGNAME } from '../utils/constant';
import FeedPostContainer from './FeedPostContainer';

const SearchContainer = () => {
  const searchString = useSelector(store => store?.searchUserName?.searchText);
  const [postsList,setPostsList] = useState(null);
  const [postData,setPostData] = useState(null);
  const fetchSearchedPost =async (page = 1)=>
    {
        const res = await fetch(GET_POST_BY_TAGNAME + searchString,{
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            }
        });
        const data = await res.json();
        setPostsList(data?.data.posts);
        setPostData(data);
    }
    useEffect(()=>
    {
        fetchSearchedPost();
    },[]);
  return (
    <div className='w-3/12 mx-auto text-center'>
        <h1 className='text-blue-500 text-2xl py-3'>#{searchString}</h1>
        <div className='text-start'>
            {postsList && postsList.map((post,index)=>
            {
                return <FeedPostContainer post={post} key={post._id}/>
            })}
        </div>
    </div>
  )
}

export default SearchContainer